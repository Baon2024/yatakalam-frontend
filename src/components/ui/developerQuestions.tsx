import { useEffect, useState } from "react"
import { supabase } from "@/pages/supabase"
import { useContext } from "react"
import { AuthContext } from "@/hooks/authState"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import { Trash2, Plus, Save, MessageCircleQuestion, Sparkles, FileText, CheckCircle2, AlertCircle, HelpCircle } from "lucide-react"


const DeveloperQuestions = ({ developerQuestions, setDeveloperQuestions, userID, loading, isLoading }) => {

    const { toast } = useToast()
    const [newQuestion, setNewQuestion] = useState("")
    const [isSaving, setIsSaving] = useState(false)
    
    


async function saveDeveloperQuestionsHandler() {
  
const { data, error } = await supabase
  .from('user-details')
  .update({ developer_questions: developerQuestions })
  .eq('linked_user', userID)
  .select()

  if (error) {
    console.log("error from trying to save questions in supabvase: ", error)
  } else if (data) {
    console.log("questiosn saved, and data returned is: ", data);

    toast({
        title: "Success",
        description: "questions successfully saved!",
        variant: "success"
      });

  }
          

    }

 const addQuestion = () => {
    const q = newQuestion.trim();
    if (!q) return;
    setDeveloperQuestions(prev => [...prev, q]); // optimistic add
    setNewQuestion(""); // clear input
  };

   const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      addQuestion()
    }
  }

  const handleDeleteQuestion = (index) => {
  // Remove the question from the state using filter
  setDeveloperQuestions((prevQuestions) => {
    // Use the filter function to remove the item at the given index
    return prevQuestions.filter((_, i) => i !== index);
  });
};

    //need to be able to edit local question state, then save to database

       return (
    <Card className="h-fit bg-gray-900 border-gray-800">
      <CardHeader>
        <div className="flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-green-400" />
          <CardTitle className="text-white">Developer Questions</CardTitle>
        </div>
        <CardDescription className="text-gray-400">
          Manage frequently asked questions for your assistant
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Add a new question..."
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && addQuestion()}
            className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
          />
          <Button onClick={addQuestion} size="sm" className="bg-green-500 hover:bg-green-600 text-black">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {developerQuestions?.map((question, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-800 rounded-lg border border-gray-700"
            >
              <span className="text-sm text-gray-200">{question}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDeleteQuestion(index)}
                className="h-6 w-6 p-0 text-red-400 hover:text-red-300 hover:bg-red-900/20"
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center pt-2">
          <Badge variant="outline" className="bg-gray-800 text-gray-300 border-gray-600">
            {developerQuestions?.length} questions configured
          </Badge>
          <Button onClick={saveDeveloperQuestionsHandler} disabled={isSaving} size="sm" className="shadow-[0_0_34px_rgba(42,240,124,0.4)] bg-[#2af07c] text-black">
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


export default DeveloperQuestions