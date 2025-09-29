import { useState } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"
import { Skeleton } from "@/components/ui/skeleton"
import { MessageCircleQuestion, Plus, FileText, Sparkles, Save, AlertCircle, CheckCircle2, Edit3 } from "lucide-react"
import { supabase } from "@/pages/supabase"
import { Settings, MessageSquare} from "lucide-react"
import { Textarea } from "@/components/ui/textarea"

const DeveloperFirstMessage = ({ isLoading, developerFirstMessage, setDeveloperFirstMessage, userID }) => {
  const [newQuestion, setNewQuestion] = useState("")
  const { toast } = useToast()
  const [isSaving, setIsSaving] = useState(false)

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      setQuestion()
    }
  }

  const setQuestion = () => {
    if (newQuestion.trim()) {
      // Logic to set/replace the current question
      setDeveloperFirstMessage(newQuestion)
    }
  }

  const handleDeleteQuestion = (index) => {
  // Remove the question from the state using filter
  setDeveloperFirstMessage((prevQuestions) => {
    // Use the filter function to remove the item at the given index
    return prevQuestions.filter((_, i) => i !== index);
  });
};

  async function saveDeveloperFirstMessageHandler() {
    
  const { data, error } = await supabase
    .from('user-details')
    .update({ first_message: developerFirstMessage })
    .eq('linked_user', userID)
    .select()
  
    if (error) {
      console.log("error from trying to save knowledge_base in supabvase: ", error)
    } else if (data) {
      console.log("knowledge_base saved, and data returned is: ", data);
  
      toast({
          title: "Success",
          description: "knowledge_base successfully saved!",
          variant: "success"
        });
  
    }
}

  return (
    <Card className="h-fit bg-gray-900 border-gray-800">
      <CardHeader>
        <div className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" style={{ color: "#2af07c" }} />
          <CardTitle className="text-white">First Message</CardTitle>
        </div>
        <CardDescription className="text-gray-400">Set up your assistant's initial greeting message</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="Enter your first message here..."
          value={developerFirstMessage}
          onChange={(e) => setDeveloperFirstMessage(e.target.value)}
          className="min-h-32 resize-none bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
        />
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="bg-gray-800 text-gray-300 border-gray-600">
            {developerFirstMessage.length} characters
          </Badge>
          <Button
            onClick={saveDeveloperFirstMessageHandler}
            disabled={isSaving}
            size="sm"
            className="shadow-[0_0_34px_rgba(42,240,124,0.4)] bg-[#2af07c] text-black"
          >
            {isSaving ? (
              <>Saving...</>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )

}

export default DeveloperFirstMessage