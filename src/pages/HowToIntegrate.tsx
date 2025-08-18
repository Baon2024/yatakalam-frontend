import { useAuth } from "@/hooks/authState"
import { AuthContext } from "@/hooks/authState"



export default function HowToIntegrate() {
    
let userUDN = JSON.parse(localStorage.getItem("userUDN"))
  let uniqueDeveloperNumber = userUDN.unique_developer_number
  console.log("uniqueDeveloperNumber is ", uniqueDeveloperNumber) 


    return (
        <>
        <p>Placeholder</p>
        </>
    )
}