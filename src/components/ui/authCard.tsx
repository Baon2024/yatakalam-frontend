import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Eye, EyeOff } from "lucide-react"
import { useContext } from "react"
import { useAuth } from "@/hooks/authState"
import { useToast } from "./use-toast"
import { supabase } from "@/pages/supabase"
import { useNavigate } from "react-router-dom"

export default function AuthCard() {
  const [showPassword, setShowPassword] = useState(false)
  const [status, setStatus] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const { user, setUser } = useAuth() //use these to set user immaidetly and re-direct without waiting
  const [ email, setEmail ] = useState("")
  const { toast } = useToast()
  const [ showForgotPasswordModal, setShowForgotPasswordModal ] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    console.log("value of email is: ", email)
  })

  const handleSignUp = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const organisationName = formData.get("name")
    let email = formData.get("email")
    let password = formData.get("password")
    const confirmPassword = formData.get("confirmPassword")

    console.log("Sign up:", { organisationName, email, password, confirmPassword })
    // Add your sign-up logic here
    if (password === confirmPassword) {
        //sign-up logic
        console.log("passwords match!")
        if (typeof email !== "string" || typeof password !== "string") return;

        const { data, error } = await supabase.auth.signUp({
        email,
        password, //no redirectTo defined, as I turned email confirmation off in supabase policies page for authentication
    });

    if (error) {
        toast({
        title: "Error",
        description: `There was an error in the sign-up process ${error} `,
        variant: "destructive"
      });
    } else if (data.session) {
        setUser(data.session.user);
        let userID = data.session.user.id
        console.log("this is the value of data.session.user ", data.session.user)
        console.log("account created!")
        
        toast({
        title: "Success",
        description: "account successfully created, navigating to index!",
        variant: "success"
      });

        //need to generate uniqueDeveloperNumber and store in the user-details table, using their uid
        //then retrieve it from user-details table, and store in localStorage
        //need to add organisationName to userDetails

      const { data: udnData, error } = await supabase
  .from('user-details')
  .insert([
    { linked_user: userID, organisation_name: organisationName },
  ])
  .select()
  if (error) {
    console.log("there was an error in creating user's UDN ", error)
  } else if (data) {
    console.log("UDN created and organisationName inserted, data returned is: ", udnData);
    //put in localStorage, for user in endpoint url parameter
    localStorage.setItem('userUDN', JSON.stringify(udnData[0]));
  }
      
      console.log("account created!")
      console.log("about to navigate to index!")
      navigate('/index')


    }
    // Optional eager set if session exists (usually only when confirmations are OFF)
    //if (!error && data.session) setUser(data.session.user);
    //console.log("account created!")

    } else {
      toast({
        title: "Error",
        description: "Your passwords do not match!",
        variant: "destructive"
      });
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const email = formData.get("email")
    const password = formData.get("password")

    console.log("Login:", { email, password })
    // Add your login logic here
    if (typeof email !== "string" || typeof password !== "string") return;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password, //no redirectTo defined, as I turned email confirmation off in supabase policies page for authentication
      });

    if (error) {
        console.log("error returned: ", error);

        toast({
        title: "Error",
        description: `There was an error in the login process: ${error}`,
        variant: "destructive"
      });
    } else if (data.session) {
        setUser(data.session.user);
        let userID = data.session.user.id
        console.log("this is the value of data.session.user ", data.session.user)
        console.log("account logged-in!")
        
        toast({
        title: "Success",
        description: "login successful!",
        variant: "success"
      });

        //need to retrieve it from user-details table using id, and store in localStorage
        const { data: udnData, error } = await supabase
  .from('user-details')
  .select('*') // or list columns you need
  .eq('linked_user', userID) // filter by your column
  .single(); // ensures you get a single object instead of an array
       if (error) {
        console.log("error on getting user_details data on sign-in", error)
       } else if (udnData) {
        console.log("user_details successfuly retrieved, data is: ", udnData);
        localStorage.setItem('userUDN', JSON.stringify(udnData));
       }
      
      console.log("about to navigate to index!")
      navigate('/index')


    }
    // Optional eager set if session exists (usually only when confirmations are OFF)
    //need to retrieve UDN from user-details table, and store in localStorage
  }

  const handleForgotPassword = (e) => {
    console.log("Now showing modal for forgotten email...")
    setShowForgotPasswordModal(true)
  }

  const handleSendForgotPassword = async (e) => {
    e.preventDefault()
    console.log("handleSendForgotPassword triggered...")
    console.log(`address being sent to is: ${window.location.origin}/reset-password`)
    setStatus("sending");
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    console.log("and after handleSendForgotPassword ...")
    if (error) setStatus(`error:${error.message}`);
    else setStatus("sent");
  
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Welcome</CardTitle>
          <CardDescription className="text-center">Sign in to your account or create a new one</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="space-y-4">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <Input id="login-email" name="email" type="email" placeholder="m@example.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <div className="relative">
                    <Input
                      id="login-password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Button
                    type="button"
                    variant="link"
                    className="px-0 text-sm text-muted-foreground hover:text-primary"
                    onClick={handleForgotPassword}
                  >
                    Forgot password?
                  </Button>
                </div>
                <Button type="submit" className="w-full">
                  Sign In
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup" className="space-y-4">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name">Organisation Name</Label>
                  <Input id="signup-name" name="name" type="text" placeholder="John Doe" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input id="signup-email" name="email" type="email" placeholder="m@example.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <div className="relative">
                    <Input
                      id="signup-password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-confirm-password">Confirm Password</Label>
                  <div className="relative">
                    <Input
                      id="signup-confirm-password"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      <span className="sr-only">{showConfirmPassword ? "Hide password" : "Show password"}</span>
                    </Button>
                  </div>
                </div>
                <Button type="submit" className="w-full">
                  Create Account
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-sm text-muted-foreground text-center">
            By continuing, you agree to our{" "}
            <a href="#" className="underline hover:text-primary">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="underline hover:text-primary">
              Privacy Policy
            </a>
          </div>
        </CardFooter>
      </Card>

      <Dialog open={showForgotPasswordModal} onOpenChange={setShowForgotPasswordModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Reset Password</DialogTitle>
            <DialogDescription>
              Enter your email address and we'll send you a link to reset your password.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSendForgotPassword}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="forgot-email">Email</Label>
                <Input
                  id="forgot-email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" className="w-full">
                Send Reset Link
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}