import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, BarChart3, ArrowRight, LogOut, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from './supabase';
import { useAuth } from '@/hooks/authState';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const { user, setUser } = useAuth()
  const navigate = useNavigate()

  let userUDN = JSON.parse(localStorage.getItem("userUDN"))
  let organisationName = userUDN.organisation_name
  console.log("userUDN is ", userUDN) 
  console.log("organisationName is ", organisationName)

 async function signOut() {
    const { error } = await supabase.auth.signOut();
    // Listener will set user to null, but you can also do it eagerly:
    if (!error) {
      setUser(null);
      localStorage.removeItem('userUDN');
      console.log("user successfully signed-out!")
      //need to clear localStorage, too
      navigate('/')

    }
    return { error };
  }

function navigateToDashboard() {
  navigate("/dashboard")
}

function navigateToDeveloperDetails() {
  navigate("/developer-details")
}

function navigateToPhoneForm() {
  navigate("/phone-form")
}

function navigateToHowToIntegrate() {
  navigate("/HowToIntegrate")
}




  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900" />
        <div className="relative max-w-7xl mx-auto px-6 py-24 sm:py-32">
          <div className="text-center space-y-8">
            <h1 className="text-4xl sm:text-6xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
              Customer Management for{" "}
              <span className="block bg-gradient-to-r from-green-400 to-green-300 bg-clip-text text-transparent">
                {organisationName}
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Streamline your customer data collection and analysis with our intuitive platform
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                onClick={navigateToHowToIntegrate}
                variant="outline"
                className="bg-gray-900 border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white transition-all duration-300"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Integrate With Your Site
              </Button>
              <Button
                onClick={navigateToDeveloperDetails}
                className="bg-green-400 text-black hover:bg-green-300 shadow-lg hover:shadow-green-400/25 transition-all duration-300"
              >
                <Settings className="h-4 w-4 mr-2" />
                Agent Settings
              </Button>
            </div>

            {/* Primary CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Button
                onClick={navigateToPhoneForm}
                size="lg"
                className="bg-green-400 text-black hover:bg-green-300 shadow-lg hover:shadow-green-400/25 transition-all duration-300"
              >
                <Phone className="h-5 w-5 mr-2" />
                Test Your Agent
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
              <Button
                onClick={navigateToDashboard}
                variant="outline"
                size="lg"
                className="bg-gray-900 border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white hover:border-green-400 transition-all duration-300"
              >
                <BarChart3 className="h-5 w-5 mr-2" />
                View Dashboard
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section 
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-4">
            Choose Your Action
          </h2>
          <p className="text-gray-400 text-lg">Quick access to our main features</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="bg-gray-900 border-gray-800 shadow-lg hover:shadow-green-400/10 transition-all duration-300 group">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-green-400/25">
                <Phone className="h-8 w-8 text-black" />
              </div>
              <CardTitle className="text-2xl text-white">Phone Form</CardTitle>
              <CardDescription className="text-base text-gray-400">
                Submit your phone number through our secure form with instant API integration
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button
                onClick={navigateToPhoneForm}
                className="w-full bg-green-400 text-black hover:bg-green-300 shadow-lg hover:shadow-green-400/25 transition-all duration-300"
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800 shadow-lg hover:shadow-green-400/10 transition-all duration-300 group">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-green-400/25">
                <BarChart3 className="h-8 w-8 text-black" />
              </div>
              <CardTitle className="text-2xl text-white">Dashboard</CardTitle>
              <CardDescription className="text-base text-gray-400">
                View comprehensive customer analytics with phone numbers, names, budgets, and locations
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button
                onClick={navigateToDashboard}
                className="w-full bg-green-400 text-black hover:bg-green-300 shadow-lg hover:shadow-green-400/25 transition-all duration-300"
              >
                View Data
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div> */}
    </div>
  )
};

export default Index;
