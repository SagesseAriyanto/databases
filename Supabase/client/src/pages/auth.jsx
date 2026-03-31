import { useState } from 'react';
import { supabase } from '../db.js';

function Auth() {
  const [authData, setAuthData] = useState({ email: '', password: '' }); // Object to hold form input values
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Signup

  async function handleAuth(e) {
    e.preventDefault(); // Stop page refresh on submit

    if (isLogin) {
      // LOGIN. This will check the user's credentials and log them in if correct.
      const { error: signInError } = await supabase.auth.signInWithPassword({ email: authData.email, password: authData.password });
      if (signInError) alert(signInError.message);
      else console.log("Logged in!");
    } 
    else {
      // SIGN UP. This will send a confirmation email to the user.
      const { error: signUpError } = await supabase.auth.signUp({ email: authData.email, password: authData.password });
      if (signUpError) alert(signUpError.message);
      else alert("Check your email for the confirmation link!");
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl">
        <form className="card-body" onSubmit={handleAuth}>
          <h2 className="card-title justify-center">{isLogin ? 'Login' : 'Sign Up'}</h2>
          
          {/* Email Input */}
          <div className="form-control">
            <label className="label"><span className="label-text">Email</span></label>
            <input 
              type="email" placeholder="email@example.com" className="input input-bordered" 
              required value={authData.email} onChange={(e) => setAuthData({ ...authData, email: e.target.value })} 
            />
          </div>

          {/* Password Input */}
          <div className="form-control">
            <label className="label"><span className="label-text">Password</span></label>
            <input 
              type="password" placeholder="password" className="input input-bordered" 
              required value={authData.password} onChange={(e) => setAuthData({ ...authData, password: e.target.value })} 
            />
          </div>

          <div className="form-control mt-6">
            <button className="btn btn-primary">{isLogin ? 'Login' : 'Register'}</button>
          </div>

          {/* Toggle Link */}
          <p className="text-center text-sm mt-2">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button 
              type="button" className="link link-primary ml-1" 
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? 'Sign Up' : 'Login'}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Auth;