import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase/config";
import { Link, useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";


function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const [role, setRole] = useState("student");

    const handleSignup = async (e) => {
        e.preventDefault();

        try{
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                role: role,
            });
            

            alert("Signup Successful");
            navigate('/dashboard');
        } catch(error){
            alert(error.message);
        }
    };

  return (
    <div className="auth-page">
    <form className="auth-card" onSubmit={handleSignup}>
        <h1>Create Account 🚀</h1>
        <p>Join Mini School LMS today</p>

        <input 
            type="email"
            placeholder="Email"
            onChange={(e)=>setEmail(e.target.value)}
        />

        <input 
            type="password"
            placeholder="Password"
            onChange={(e)=>setPassword(e.target.value)}
        />

        <h3>Are you registering as a Student or Teacher?</h3>
        <label>
            <input 
                type="radio" 
                name="role"
                value="student"
                checked = {role === "student"}
                onChange={(e)=>setRole(e.target.value)}
            />
            Student
        </label>

        <label>
            <input 
                type="radio" 
                name="role"
                value="teacher"
                // checked = {role === "teacher"}
                onChange={(e)=>setRole(e.target.value)}
            />
            Teacher
        </label>

        <button>Sign Up</button>

        <p className="auth-switch">
          Already have an account? <Link to="/">Login</Link>
        </p>
    </form>
    </div>
  )
}

export default Signup