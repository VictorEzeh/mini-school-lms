import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import {Link, useNavigate} from 'react-router-dom'


function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try{
            await signInWithEmailAndPassword(auth, email, password);
            alert("Login Successful");
            navigate('/dashboard');
        } catch (error){
            alert(error.message);
        }
    };

  return (
    <div className='auth-page'>
        <form className="auth-card" onSubmit={handleLogin}>
            <h1>Welcome Back 👋</h1>
            <p>Login to continue learning</p>

            <input 
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            />

            <input 
                type="password"
                placeholder="Password"
                onChange={(e)=>setPassword(e.target.value)}
            />

            <button>Log In</button>

            <p className="auth-switch">
                Don’t have an account? <Link to="/signup">Sign Up</Link>
            </p>
        </form>
    </div>
    
  )
}

export default Login