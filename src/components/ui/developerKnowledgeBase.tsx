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
import { MessageCircleQuestion, Plus, FileText, Sparkles, Save, AlertCircle, CheckCircle2, Edit3, BookOpen } from "lucide-react"
import { supabase } from "@/pages/supabase"
import { Textarea } from "@/components/ui/textarea"

const DeveloperKnowledgeBase = ({ isLoading, developerKnowledgeBase, setDeveloperKnowledgeBase, userID }) => {
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
      setDeveloperKnowledgeBase(newQuestion)
    }
  }

  const handleDeleteQuestion = (index) => {
  // Remove the question from the state using filter
  setDeveloperKnowledgeBase((prevQuestions) => {
    // Use the filter function to remove the item at the given index
    return prevQuestions.filter((_, i) => i !== index);
  });
};

  async function saveDeveloperKnowledgeBaseHandler() {
    
  const { data, error } = await supabase
    .from('user-details')
    .update({ knowledge_base: developerKnowledgeBase })
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
          <BookOpen className="h-5 w-5 text-green-400" />
          <CardTitle className="text-white">Knowledge Base</CardTitle>
        </div>
        <CardDescription className="text-gray-400">Configure your assistant's knowledge repository</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="Enter your knowledge base content here..."
          value={developerKnowledgeBase}
          onChange={(e) => setDeveloperKnowledgeBase(e.target.value)}
          className="min-h-48 resize-none bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
        />
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="bg-gray-800 text-gray-300 border-gray-600">
            {developerKnowledgeBase.length} characters
          </Badge>
          <Button
            onClick={saveDeveloperKnowledgeBaseHandler}
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

export default DeveloperKnowledgeBase