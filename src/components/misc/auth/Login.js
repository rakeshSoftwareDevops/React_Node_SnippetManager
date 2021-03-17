import React,{useContext, useState} from "react";
import Axios from "axios";
import {Link,useHistory} from "react-router-dom";
import "../auth/AuthForm.scss";
import UserContext from "../../../context/UserContext";
import ErrorMessage from "../ErrorMessage";

function Login(){
    const[formEmail,setFormEmail]=useState("");
    const[formPassword,setFormPassword]=useState("");
    const {getUser}=useContext(UserContext);
    const history=useHistory();
    const [errorMessage,setErrorMessage]=useState(null);

    async function login(e){
        e.preventDefault();
        const loginData={  
            email:formEmail,
            password:formPassword,
        }
        try{
            await Axios.post("http://localhost:5000/auth/login",loginData);
        }catch(err){
            if(err.response){
                if(err.response.data.errorMessage){
                    setErrorMessage(err.response.data.errorMessage);
                    console.log("error variable"+errorMessage);
                }
            }
        }
        if(errorMessage==null){
            console.log("go");
            await getUser();
            history.push("/");
        }
       
       

        //If we dont set httpflag as true in the server we can get the flag details in the browser
        console.log(document.cookie);

    }


    return(
            <div className="auth-form">
                <h2>Log in</h2>
                {
                  errorMessage&&<ErrorMessage message={errorMessage} clear={()=>setErrorMessage(null)}/>
                }
                <form className="form"onSubmit={login}>
                    <label htmlFor="form-email">Email</label>
                    <input
                        id="form-email" 
                        type="email" 
                        value={formEmail} 
                        onChange={(e)=>setFormEmail(e.target.value)}
                    />
                    <label htmlFor="form-password">Password</label>
                    <input
                        id="form-password" 
                        type="password" 
                        value={formPassword} 
                        onChange={(e)=>setFormPassword(e.target.value)}
                    />
                    <button className="btn-submit" type="submit">
                        Log in
                    </button>
                </form>
                <p>Don't have an account yet? <Link to="/Register">Register Here</Link></p>
                

    
            </div>
    );
    };

export default Login;