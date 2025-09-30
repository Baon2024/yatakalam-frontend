import { useAuth } from "@/hooks/authState"
import { AuthContext } from "@/hooks/authState"
import { ArrowLeft, Copy, Check } from "lucide-react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"


export default function HowToIntegrate() {

  const [copiedStates, setCopiedStates] = useState({})
  const [ userUDN, setUserUDN ] = useState(null)
  const [ uniqueDeveloperNumber, setUniqueDeveloperNumber ] = useState("")

  useEffect(() => {
    const storedUDN = localStorage.getItem("userUDN")
    if (storedUDN) {
      const parsedUDN = JSON.parse(storedUDN)
      setUserUDN(parsedUDN)
      setUniqueDeveloperNumber(parsedUDN.unique_developer_number)
      console.log("uniqueDeveloperNumber is ", parsedUDN.unique_developer_number)
    }
  }, [])
    


  function handleBack() {
    window.history.back()
  }

  const copyToClipboard = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedStates((prev) => ({ ...prev, [key]: true }))
      setTimeout(() => {
        setCopiedStates((prev) => ({ ...prev, [key]: false }))
      }, 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }


  let pythonCode = "pythonCode holder"
  let javascriptCode = "javascript holder"
  let formIntegrationCode = "formIntegrationCode"


   return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Button
            onClick={handleBack}
            variant="ghost"
            className="mb-4 text-gray-400 hover:text-white hover:bg-gray-800"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-4">
            API Integration Guide
          </h1>
          <p className="text-gray-400 text-lg">
            Learn how to integrate your unique developer number with our API using Python or JavaScript
          </p>
        </div>

        {/* UDN Display */}
        <Card className="bg-gray-900 border-gray-700 mb-8 shadow-lg shadow-green-400/5">
          <CardHeader>
            <CardTitle className="text-green-400">Your Unique Developer Number</CardTitle>
          </CardHeader>
          <CardContent>
            {userUDN ? (
              <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <p className="text-2xl font-mono text-green-400 font-bold">{uniqueDeveloperNumber}</p>
                <p className="text-gray-400 text-sm mt-2">
                  Use this number in all API requests to identify your integration
                </p>
              </div>
            ) : (
              <p className="text-gray-400">Loading your unique developer number...</p>
            )}
          </CardContent>
        </Card>

        

        {/* Form Integration Example */}
        <Card className="bg-gray-900 border-gray-700 mb-8 shadow-lg shadow-green-400/5">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-green-400">Form Integration</CardTitle>
            <Button
              onClick={() => copyToClipboard(formIntegrationCode, "form")}
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white hover:bg-gray-800"
            >
              {copiedStates.form ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
              {copiedStates.form ? "Copied!" : "Copy"}
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-gray-400 mb-3">
                  Integrate directly with HTML forms by sending data to your endpoint URL with the phoneNumber variable.
                </p>
                <div className="bg-gray-800 rounded-lg p-3 border border-gray-700 mb-3">
                  <p className="text-sm text-gray-400 mb-1">Endpoint URL:</p>
                  <p className="text-green-400 font-mono text-sm">https://mangoexpressbackend-tbsi.onrender.com/outbound-call/{uniqueDeveloperNumber}</p>
                </div>
                <div className="bg-gray-800 rounded-lg p-3 border border-gray-700 mb-3">
                  <p className="text-sm text-gray-400 mb-1">method type:</p>
                  <p className="text-green-400 font-mono text-sm">POST</p>
                </div>
                <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
                  <p className="text-sm text-gray-400 mb-1">Variable to send:</p>
                  <p className="text-green-400 font-mono text-sm">phoneNumber</p>
                  <p className="text-sm text-gray-400 mb-1">Variable value:</p>
                  <p className="text-green-400 font-mono text-sm">the phone number entered by the user</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        
      </div>
    </div>
  )
}