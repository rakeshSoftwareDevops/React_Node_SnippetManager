import React,{useState,useContext} from "react";
import Axios from "axios";
import {Link,useHistory} from "react-router-dom";
import "../auth/AuthForm.scss";
import UserContext from "../../../context/UserContext";
import ErrorMessage from "../ErrorMessage";


function Register(){
    const[formEmail,setFormEmail]=useState("");
    const[formPassword,setFormPassword]=useState("");
    const[formPasswordVerify,setFormPasswordVerify]=useState("");
    const{getUser}=useContext(UserContext);
    const history=useHistory();
    const [errorMessage,setErrorMessage]=useState(null);


    async function register(e){
        e.preventDefault();
        const registerData={
            email:formEmail,
            password:formPassword,
            passwordVerify:formPasswordVerify
        }
        try{
            await Axios.post("http://localhost:5000/auth/",registerData);

        }catch(err){
            console.log(err.response.data.errorMessage);
            if(err.response){
                if(err.response.data.errorMessage){
                    setErrorMessage(err.response.data.errorMessage);
                    console.log("go here"+errorMessage);
                }
            }
        }
        if(errorMessage==null){
            await getUser();
            history.push("/");
        }
       

        //If we dont set httpflag as true in the server we can get the flag details in the browser
        console.log(document.cookie);

    }


    return(
            <div className="auth-form">
                <h2>Register a new account</h2>
                {
                  errorMessage&&<ErrorMessage message={errorMessage} clear={()=>setErrorMessage(null)}/>
                }
                <form className="form" onSubmit={register}>
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
                    <label htmlFor="form-passwordVerify">Verify password</label>
                    <input
                        id="form-passwordVerify" 
                        type="password" 
                        value={formPasswordVerify} 
                        onChange={(e)=>setFormPasswordVerify(e.target.value)}
                    />
                    <button className="btn-submit" type="submit">
                        Register
                    </button>
                </form>
                <p>Already have an account? <Link to="/login">Login Instead</Link></p>
                

    
            </div>
    );
    };

export default Register;