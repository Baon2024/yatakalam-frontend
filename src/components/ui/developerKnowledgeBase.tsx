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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50">
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
                  <Skeleton className="h-16 w-full" />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50">
      <div className="w-1/2 px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* Header Section */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
              <MessageCircleQuestion className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Focus Question
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Concentrate on one key question at a time for deeper focus and understanding
            </p>
          </div>

          

          <div className="grid gap-6">
            {/* Set Question Section */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-600">
                    <Edit3 className="h-5 w-5 text-white" />
                  </div>
                  {developerKnowledgeBase ? "Update agent knowledge base" : "Set agent knowledge base"}
                </CardTitle>
                <CardDescription className="text-base">
                  {developerKnowledgeBase
                    ? "Replace your current agent knowledge base with a new one"
                    : "Choose agent knowledge base"}
                </CardDescription>
              </CardHeader>
              <Separator className="mx-6" />
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="space-y-3">
                    <Label htmlFor="focus-question" className="text-sm font-semibold">
                      Question Content
                    </Label>
                    <div className="relative">
                      <Input
                        id="focus-question"
                        placeholder="Enter your most important technical question..."
                        value={newQuestion}
                        onChange={(e) => setNewQuestion(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="pr-12 h-12 text-base border-2 focus:border-purple-500 transition-colors"
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={setQuestion}
                    disabled={!newQuestion.trim()}
                    size="lg"
                    className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    {developerKnowledgeBase ? "Update agent knowledge base" : "Set agent knowledge base"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Current Question Display */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <CardTitle className="flex items-center gap-3 text-xl">
                      <div className="p-2 rounded-lg bg-gradient-to-r from-orange-500 to-red-600">
                        <Sparkles className="h-5 w-5 text-white" />
                      </div>
                      Current Focus
                    </CardTitle>
                    <CardDescription className="text-base">
                      {developerKnowledgeBase ? "Your agent knowledge base" : "No agent knowledge base set yet"}
                    </CardDescription>
                  </div>
                  {developerKnowledgeBase && (
                    <Badge
                      variant="secondary"
                      className="text-sm px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border-purple-200"
                    >
                      Active Focus
                    </Badge>
                  )}
                </div>
              </CardHeader>

              <Separator className="mx-6" />

              <CardContent className="pt-6">
                {developerKnowledgeBase ? (
                  <div className="space-y-6">
                    <div className="p-6 border-2 border-purple-100 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center">
                          <MessageCircleQuestion className="h-5 w-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-base font-medium leading-relaxed text-gray-800 break-words">
                            {developerKnowledgeBase}
                          </p>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <Button
                        onClick={saveDeveloperKnowledgeBaseHandler}
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
                            Save Focus Question
                          </>
                        )}
                      </Button>
                      <div className="text-sm text-muted-foreground flex items-center gap-2 px-3">
                        <AlertCircle className="h-4 w-4" />
                        Focus on one question for better results
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-purple-100 to-pink-200 mb-6">
                      <MessageCircleQuestion className="h-10 w-10 text-purple-400" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-900">No focus question set</h3>
                    <p className="text-muted-foreground mb-6 max-w-md mx-auto leading-relaxed">
                      Choose one important technical question to focus on. This approach helps you dive deeper and gain
                      better understanding of specific topics.
                    </p>
                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                      <Sparkles className="h-4 w-4" />
                      <span>Set your focus question above</span>
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

export default DeveloperKnowledgeBase