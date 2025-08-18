import { useEffect, useState } from "react"
import { supabase } from "@/pages/supabase"
import { useContext } from "react"
import { AuthContext } from "@/hooks/authState"
import { useToast } from "@/hooks/use-toast"
import DeveloperKnowledgeBase from "@/components/ui/developerKnowledgeBase"
import DeveloperQuestions from "@/components/ui/developerQuestions"
import DeveloperFirstMessage from "@/components/ui/developerFirstMessage"


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
          setIsLoading(false)
  
      },[loading, userID, setDeveloperQuestions, setDeveloperKnowledgeBase])

   return (
    <div className="flex min-h-screen">
    <DeveloperQuestions developerQuestions={developerQuestions} setDeveloperQuestions={setDeveloperQuestions} userID={userID} loading={loading} isLoading={isLoading}  />
    <DeveloperKnowledgeBase developerKnowledgeBase={developerKnowledgeBase} setDeveloperKnowledgeBase={setDeveloperKnowledgeBase} userID={userID} isLoading={isLoading}  />
    <DeveloperFirstMessage developerFirstMessage={developerFirstMessage} setDeveloperFirstMessage={setDeveloperFirstMessage} userID={userID} isLoading={isLoading} />
    </div>
   )
}


export default DeveloperDetails