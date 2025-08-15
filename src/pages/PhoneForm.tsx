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
  const [ toggleUniversalQuestions, setToggleUniversalQuestions ] = useState(true)
  const [isToggleEnabled, setIsToggleEnabled] = useState(false)

  useEffect(() => {
    let userUDN = JSON.parse(localStorage.getItem('userUDN'));
    console.log("parsed userUDN from localStorage is: ", userUDN);
    let uniqueDeveloperNumberToSet = userUDN.unique_developer_number;
    console.log("and uniqueDeveloperNumber is: ", uniqueDeveloperNumberToSet);
    setUniqueDeveloperNumber(uniqueDeveloperNumberToSet);
  },[])

  useEffect(() => {
    console.log("isToggleEnabled is: ", isToggleEnabled);
  },[isToggleEnabled])

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
        body: JSON.stringify({ number: phoneNumber, universalQuestionsOn: isToggleEnabled })
      });
      
      if (response.ok) {
        toast({
          title: "Success!",
          description: "Phone number submitted successfully",
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
    <div className="min-h-screen bg-background p-4 flex items-center justify-center">
      <div className="w-full max-w-md space-y-6">
        <Link
          to="/index"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <Card className="bg-gradient-card shadow-medium border-0">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center shadow-glow">
              <Phone className="h-8 w-8 text-primary-foreground" />
            </div>
            <div>
              <CardTitle className="text-2xl">Test Your Agent</CardTitle>
              <CardDescription className="text-muted-foreground">Enter your phone number to submit</CardDescription>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="h-12 text-lg border-border focus:ring-primary focus:border-primary"
                />
              </div>

              <div className="flex items-center justify-between space-x-2">
                <div className="space-y-1">
                  <Label htmlFor="toggle" className="text-sm font-medium">
                    Enable Universal Questions only
                  </Label>
                  <p className="text-xs text-muted-foreground">Toggle advanced features for your agent test</p>
                </div>
                <Switch id="toggle" checked={isToggleEnabled} onCheckedChange={setIsToggleEnabled} />
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-gradient-primary hover:shadow-glow transition-all duration-300 text-lg font-medium"
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