import { useEffect, useState } from "react"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import { onAuthStateChanged } from "firebase/auth"
import { auth, db } from "./firebase/config"
import ProtectedRoute from "./components/ProtectedRoute"
import { Route, Routes } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Assignments from "./pages/Assignments"
import { doc, getDoc } from "firebase/firestore"


function App() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) =>  {
      
      if(currentUser){
        setUser(currentUser);
        console.log('uid', currentUser?.uid);

        const userDocRef = doc(db, 'users', currentUser.uid); 
        try{
          const userDocSnap = await getDoc(userDocRef);
          if(userDocSnap.exists()){
            setRole(userDocSnap.data().role);
          }else{
            console.log("User document does not yet exist")
          }
        }catch{
          console.log(console.error());
        }
        
        
        console.log(role);
      }else{
      console.log("No current User");
      }
    
    });

    return unsubscribe;
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute user={user}>
            <Dashboard user={user}/>
         </ProtectedRoute>
        }/>
      <Route
        path="/assignments"
        element={
          <ProtectedRoute user={user}>
            <Assignments user={user} role={role}/>
          </ProtectedRoute>
        }/>
    </Routes>
  )
}

export default App