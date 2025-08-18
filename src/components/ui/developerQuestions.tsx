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
import { Trash2, Plus, Save, MessageCircleQuestion, Sparkles, FileText, CheckCircle2, AlertCircle } from "lucide-react"


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

      if (loading || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="w-1/2 px-4 py-8 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {/* Header Skeleton */}
            <div className="text-center space-y-4">
              <Skeleton className="h-10 w-80 mx-auto" />
              <Skeleton className="h-6 w-96 mx-auto" />
            </div>

            {/* Cards Skeleton */}
            <div className="grid gap-6">
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                <CardHeader className="space-y-4">
                  <Skeleton className="h-6 w-48" />
                  <Skeleton className="h-4 w-64" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-32" />
                </CardContent>
              </Card>

              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <Skeleton className="h-6 w-48" />
                </CardHeader>
                <CardContent className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-16 w-full" />
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="w-1/2 px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* Header Section */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 mb-4">
              <MessageCircleQuestion className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Developer Questions
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Build and manage your collection of technical interview questions and development topics
            </p>
          </div>

          

          <div className="grid gap-6">
            {/* Add New Question Section */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600">
                    <Plus className="h-5 w-5 text-white" />
                  </div>
                  Add New Question
                </CardTitle>
                <CardDescription className="text-base">
                  Expand your question collection with new technical topics and interview questions
                </CardDescription>
              </CardHeader>
              <Separator className="mx-6" />
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="space-y-3">
                    <Label htmlFor="new-question" className="text-sm font-semibold">
                      Question Content
                    </Label>
                    <div className="relative">
                      <Input
                        id="new-question"
                        placeholder="Enter your technical question or topic here..."
                        value={newQuestion}
                        onChange={(e) => setNewQuestion(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="pr-12 h-12 text-base border-2 focus:border-blue-500 transition-colors"
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={addQuestion}
                    disabled={!newQuestion.trim()}
                    size="lg"
                    className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Question
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Questions List */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <CardTitle className="flex items-center gap-3 text-xl">
                      <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-600">
                        <Sparkles className="h-5 w-5 text-white" />
                      </div>
                      Your Question Collection
                    </CardTitle>
                    <CardDescription className="text-base">
                      {developerQuestions && developerQuestions.length > 0
                        ? `${developerQuestions.length} question${developerQuestions.length === 1 ? "" : "s"} ready for your next interview`
                        : "Start building your personalized question library"}
                    </CardDescription>
                  </div>
                  {developerQuestions && developerQuestions.length > 0 && (
                    <Badge
                      variant="secondary"
                      className="text-sm px-3 py-1 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 border-blue-200"
                    >
                      {developerQuestions.length} {developerQuestions.length === 1 ? "Question" : "Questions"}
                    </Badge>
                  )}
                </div>
              </CardHeader>

              <Separator className="mx-6" />

              <CardContent className="pt-6">
                {developerQuestions && developerQuestions.length > 0 ? (
                  <div className="space-y-6">
                    <ScrollArea className="h-[400px] pr-4">
                      <div className="space-y-3">
                        {developerQuestions.map((question, index) => (
                          <div
                            key={index}
                            className="group relative p-5 border-2 border-gray-100 rounded-xl bg-gradient-to-r from-white to-gray-50 hover:from-blue-50 hover:to-indigo-50 hover:border-blue-200 transition-all duration-200 hover:shadow-md"
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start gap-3">
                                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center text-sm font-semibold text-gray-600 mt-1">
                                    {index + 1}
                                  </div>
                                  <p className="text-sm font-medium leading-relaxed text-gray-800 break-words">
                                    {question}
                                  </p>
                                </div>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteQuestion(index)}
                                className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-red-500 hover:text-red-700 hover:bg-red-50 flex-shrink-0"
                              >
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Remove question</span>
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>

                    <Separator />

                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <Button
                        onClick={saveDeveloperQuestionsHandler}
                        disabled={isSaving}
                        size="lg"
                        className="flex-1 sm:flex-none bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-xl transition-all duration-200"
                      >
                        {isSaving ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="h-4 w-4 mr-2" />
                            Save Questions
                          </>
                        )}
                      </Button>
                      <div className="text-sm text-muted-foreground flex items-center gap-2 px-3">
                        <AlertCircle className="h-4 w-4" />
                        Changes are saved automatically to your profile
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 mb-6">
                      <MessageCircleQuestion className="h-10 w-10 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-900">No questions yet</h3>
                    <p className="text-muted-foreground mb-6 max-w-md mx-auto leading-relaxed">
                      Start building your personalized question collection by adding your first technical question
                      above. Perfect for interview preparation and knowledge tracking.
                    </p>
                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                      <Sparkles className="h-4 w-4" />
                      <span>Add questions to get started</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}


export default DeveloperQuestions