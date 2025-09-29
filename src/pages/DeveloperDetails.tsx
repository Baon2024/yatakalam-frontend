import { useEffect, useState } from "react"
import { supabase } from "@/pages/supabase"
import { useContext } from "react"
import { AuthContext } from "@/hooks/authState"
import { useToast } from "@/hooks/use-toast"
import DeveloperKnowledgeBase from "@/components/ui/developerKnowledgeBase"
import DeveloperQuestions from "@/components/ui/developerQuestions"
import DeveloperFirstMessage from "@/components/ui/developerFirstMessage"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Settings, MessageSquare, HelpCircle, BookOpen, Plus, Save, Trash2 } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { Link } from 'react-router-dom';
import { ArrowLeft } from "lucide-react"

const DeveloperDetails = () => {
const [ developerQuestions, setDeveloperQuestions ] = useState(null);
    const [ developerKnowledgeBase, setDeveloperKnowledgeBase ] = useState("");
    const [ developerFirstMessage, setDeveloperFirstMessage ] = useState("");
    const [newQuestion, setNewQuestion] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
    const { user, loading } = useContext(AuthContext);
    const userID = user?.id;

   
      
      async function getDeveloperQuestions(userID) {
           //fetch developer's questions on render
          let { data: userDetails, error } = await supabase
          .from('user-details')
          .select('developer_questions')
          .eq('linked_user', userID)
  
          if (error) {
              console.log("error trying to get developer's questions: ", error)
          } else if (userDetails) {
              console.log("developer's questions are: ", userDetails[0].developer_questions);
              setDeveloperQuestions(userDetails[0].developer_questions)
          }
      }
      
      async function getDeveloperKnowledgeBase(userID) {
           //fetch developer's questions on render
          let { data: userDetails, error } = await supabase
          .from('user-details')
          .select('knowledge_base')
          .eq('linked_user', userID)
  
          if (error) {
              console.log("error trying to get developer's knowledgeBase: ", error)
          } else if (userDetails) {
              console.log("developer's knowledgeBase is: ", userDetails[0].knowledge_base);
              setDeveloperKnowledgeBase(userDetails[0].knowledge_base)
          }
      }

      async function getDeveloperFirstMessage(userID) {
           //fetch developer's questions on render
          let { data: userDetails, error } = await supabase
          .from('user-details')
          .select('first_message')
          .eq('linked_user', userID)
  
          if (error) {
              console.log("error trying to get developer's firstMessage: ", error)
          } else if (userDetails) {
              console.log("developer's firstMessage is: ", userDetails[0].first_message);
              setDeveloperFirstMessage(userDetails[0].first_message)
          }
      }
  
  
  
      useEffect(() => {
          //fetch developer's questions on render
          //let userUDN = JSON.parse(localStorage.getItem('userUDN'));
          //console.log("parsed userUDN from localStorage is: ", userUDN);
          //let userID = userUDN.linked_user;
          //console.log("userID is: ", userID);
          if (loading) return
          if (!userID) return 
          
          if (!developerQuestions) {
          getDeveloperQuestions(userID);
          getDeveloperKnowledgeBase(userID);
          getDeveloperFirstMessage(userID);
      }
  
          //getDeveloperQuestions(userID)
          console.log("value of developerQuestions are: ", developerQuestions);
          console.log("value of newQuestion is: ", newQuestion)
          console.log("value of developerKnowledgeBase is: ", developerKnowledgeBase);
          console.log("value of userID is: ", userID);
          setIsLoading(false)
  
      },[loading, userID, setDeveloperQuestions, setDeveloperKnowledgeBase])


    const LoadingSkeleton = () => (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="h-96">
            <CardHeader>
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/6" />
              <Skeleton className="h-32 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )




   return (
    <div className="min-h-screen bg-black">
      <div className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-6">
          <div className="space-y-4">
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </button>
            <div className="flex items-center gap-3">
              <Settings className="h-6 w-6 text-green-400" />
              <h1 className="text-3xl font-light text-white">Agent Settings</h1>
            </div>
          </div>
        </div>
      </div>

      

      <div className="container mx-auto px-6 py-12">
        {isLoading ? (
          <Skeleton className="h-96 w-full bg-gray-800" />
        ) : (
          <div className="space-y-12">
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="bg-gray-900 border-gray-800 border-l-4 border-l-green-400">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <HelpCircle className="h-6 w-6 text-green-400" />
                    <CardTitle className="text-xl font-medium text-white">Questions</CardTitle>
                  </div>
                  <CardDescription className="text-gray-400 text-base">
                    Manage frequently asked questions
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="bg-gray-900 border-gray-800 border-l-4 border-l-green-400">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <BookOpen className="h-6 w-6 text-green-400" />
                    <CardTitle className="text-xl font-medium text-white">Knowledge Base</CardTitle>
                  </div>
                  <CardDescription className="text-gray-400 text-base">
                    Configure your knowledge repository
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="bg-gray-900 border-gray-800 border-l-4 border-l-green-400">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="h-6 w-6 text-green-400" />
                    <CardTitle className="text-xl font-medium text-white">First Message</CardTitle>
                  </div>
                  <CardDescription className="text-gray-400 text-base">Set up your initial greeting</CardDescription>
                </CardHeader>
              </Card>
            </div>

            <div className="grid gap-8 lg:grid-cols-1 xl:grid-cols-3">
              <div className="space-y-6">
                <DeveloperQuestions
                  developerQuestions={developerQuestions}
                  setDeveloperQuestions={setDeveloperQuestions}
                  isLoading={isLoading}
                  userID={userID}
                />
              </div>

              <div className="space-y-6">
                <DeveloperKnowledgeBase
                  developerKnowledgeBase={developerKnowledgeBase}
                  setDeveloperKnowledgeBase={setDeveloperKnowledgeBase}
                  isLoading={isLoading}
                  userID={userID}
                />
              </div>

              <div className="space-y-6">
                <DeveloperFirstMessage
                  developerFirstMessage={developerFirstMessage}
                  setDeveloperFirstMessage={setDeveloperFirstMessage}
                  isLoading={isLoading}
                  userID={userID}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}


export default DeveloperDetails