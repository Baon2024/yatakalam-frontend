// src/components/Layout.jsx
import { useAuth } from "@/hooks/authState";
import { Outlet } from "react-router-dom";
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { supabase } from './supabase';
import { useNavigate } from 'react-router-dom';

export default function Layout() {

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
    <div>
      <header>
         <header className="bg-black px-6 py-4 flex items-center justify-between">
            <h1 className="text-green-400 text-xl font-semibold">Yatakalam</h1>
            {user && (
            
              <Button
                onClick={signOut}
                variant="outline"
                className="bg-gray-900 border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white transition-all duration-300"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            )}
          </header>
        </header>

      <main>
        <Outlet /> {/* this renders the matched child route */}
      </main>

      <footer></footer>
    </div>
  );
}