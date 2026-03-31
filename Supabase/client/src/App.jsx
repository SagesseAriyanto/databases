import { useState, useEffect } from 'react';
import { supabase } from './db.js';
import TaskManager from './pages/taskManager';
import Auth from './pages/auth';

function App() {
  // If null: user is logged out. If object: user is logged in.
  const [session, setSession] = useState(null);

  useEffect(() => {
    /*
    Checks the browser's "vault" (local storage) for an existing login session.
    This handles keeping the user logged in if they refresh the page.
    */
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session); 
    };
    checkUser();

    /*
    We "subscribe" to any changes in auth (Login, Logout, or Signup).
    This function returns an object that we name 'authListener'.
    */
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      // Whenever the user logs in or out, update our 'session' state immediately.
      setSession(currentSession); 
    });
    /*
    This is "Good Housekeeping." When the user closes the app/tab,
    we tell the listener to stop watching to prevent memory leaks.
    */
    return () => {
      authListener.subscription.unsubscribe();
    };

  }, []); // [] = Run this entire "Installation" block only once on startup.

  return (
    <div className="min-h-screen bg-base-100">
      {/* TERNARY OPERATOR: 
          If session is truthy (logged in) -> Show the TaskManager page.
          If session is falsy (logged out) -> Show the Auth (Login) page.
      */}
      {session ? <TaskManager userEmail={session.user.email} /> : <Auth />}
    </div>
  );
}

export default App;