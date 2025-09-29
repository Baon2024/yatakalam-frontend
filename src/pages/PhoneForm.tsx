import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Phone, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const PhoneForm = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [ uniqueDeveloperNumber, setUniqueDeveloperNumber ] = useState('')


  useEffect(() => {
    let userUDN = JSON.parse(localStorage.getItem('userUDN'));
    console.log("parsed userUDN from localStorage is: ", userUDN);
    let uniqueDeveloperNumberToSet = userUDN.unique_developer_number;
    console.log("and uniqueDeveloperNumber is: ", uniqueDeveloperNumberToSet);
    setUniqueDeveloperNumber(uniqueDeveloperNumberToSet);
  },[])

  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phoneNumber.trim()) {
      toast({
        title: "Error",
        description: "Please enter a phone number",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulated API call //https://mangoexpressbackend-tbsi.onrender.com make dynamic too, maybe
      const response = await fetch(`https://mangoexpressbackend-tbsi.onrender.com/outbound-call/${uniqueDeveloperNumber}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ number: phoneNumber })
      });
      
      if (response.ok) {
        toast({
          title: "Success!",
          description: "Phone number submitted successfully",
          variant: "success"
        });
        setPhoneNumber('');
      } else {
        throw new Error('Failed to submit');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit phone number. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

   return (
    <div className="min-h-screen bg-black p-4 flex items-center justify-center">
      <div className="w-full max-w-md space-y-6">
        <button
          onClick={() => window.history.back()}
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </button>

        <Card className="bg-gray-900 border-gray-800 shadow-lg shadow-green-400/10 hover:shadow-green-400/20 transition-all duration-300">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-green-400 rounded-full flex items-center justify-center shadow-lg shadow-green-400/30">
              <Phone className="h-8 w-8 text-black" />
            </div>
            <div>
              <CardTitle className="text-2xl text-white bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Test Your Agent
              </CardTitle>
              <CardDescription className="text-gray-400">Enter your phone number to submit</CardDescription>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium text-gray-300">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="h-12 text-lg bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:ring-green-400 focus:border-green-400"
                />
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-green-400 hover:bg-green-500 text-black font-medium text-lg transition-all duration-300 hover:shadow-lg hover:shadow-green-400/30"
                disabled={isLoading}
              >
                {isLoading ? "Submitting..." : "Submit Phone Number"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
};

export default PhoneForm;