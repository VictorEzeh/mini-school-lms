import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try{
      await signOut(auth);
      navigate('/');
    }catch (error){
      alert(error.message);
    }
  };
  return (
    <button onClick={handleLogout}>
        Logout
    </button>
  )
}

export default Logout