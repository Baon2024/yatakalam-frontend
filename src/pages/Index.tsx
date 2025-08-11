import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, BarChart3, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from './supabase';
import { useAuth } from '@/hooks/authState';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const { user, setUser } = useAuth()
  const navigate = useNavigate()

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





  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-90" />
        <div className="relative max-w-7xl mx-auto px-6 py-24 sm:py-32">
          <div className="text-center space-y-8">
            <h1 className="text-4xl sm:text-6xl font-bold text-white">
              Customer Management
              <span className="block text-primary-glow">Made Simple</span>
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Streamline your customer data collection and analysis with our intuitive platform
            </p>
            <Button onClick={signOut}>Sign-Out</Button>
            <Button>
            <Link to="/developer-details" >set developer details</Link>
            </Button>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 shadow-glow">
                <Link to="/phone-form" className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Submit Phone Number
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
                <Link to="/dashboard" className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  View Dashboard
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Choose Your Action</h2>
          <p className="text-muted-foreground text-lg">
            Quick access to our main features
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="bg-gradient-card shadow-medium border-0 hover:shadow-glow transition-all duration-300 group">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Phone className="h-8 w-8 text-primary-foreground" />
              </div>
              <CardTitle className="text-2xl">Phone Form</CardTitle>
              <CardDescription className="text-base">
                Submit your phone number through our secure form with instant API integration
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button asChild className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300">
                <Link to="/phone-form">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-medium border-0 hover:shadow-glow transition-all duration-300 group">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <BarChart3 className="h-8 w-8 text-primary-foreground" />
              </div>
              <CardTitle className="text-2xl">Dashboard</CardTitle>
              <CardDescription className="text-base">
                View comprehensive customer analytics with phone numbers, names, budgets, and locations
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button asChild className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300">
                <Link to="/dashboard">
                  View Data
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
