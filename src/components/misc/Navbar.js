import React, { useContext } from "react";
import {Link} from "react-router-dom";
import Axios from "axios";
import UserContext from "../../context/UserContext";
import Home from "./Home"
import "./Navbar.scss"

function Navbar(){
   const {user,getUser}=useContext(UserContext);

   async function logout(){
       await Axios.get("http://localhost:5000/auth/logOut");
       await getUser();
       
   }

   return(
       <div className="navbar">
           <Link to='/'>
               <h1>Snippet Manager</h1>
           </Link>
           {user === null ?(
               <>
                <Link to='/login'>Log in</Link>
                <Link to='/Register'>Register</Link>
               </>

           ):(
               user && <button className="btn-logout" onClick={logout}>
                   Log out
                   </button> 
            ) }

           
        
       </div>
   );
}

export default Navbar;