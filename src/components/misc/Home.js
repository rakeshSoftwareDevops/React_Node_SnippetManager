import React, { useEffect,useState,useContext } from 'react';
import {Link} from "react-router-dom";
import Axios from 'axios';
import Snippet from './Snippet';
import SnippetEditor from './SnippetEditor'
import './Home.scss';
import UserContext from '../../context/UserContext';

function Home(){
    const [snippets,setSnippets]=useState([]);
    const [newsnippeteditoropen,setsnippetFlag]=useState(false);
    const [editsnippetFlag,setEditSnippetFlag]=useState(false);
    const [editsnippetData,setEditSnippetData]=useState([]);

    const {user}=useContext(UserContext);
   
    useEffect(()=>{
        if(!user){
            setSnippets([]);
            return;
        } 
        getsnippets();
        
    },[user]);
    
    function reseteditoropenflag(){
        if(newsnippeteditoropen){
            setsnippetFlag(false);
        }
       
    }
    function editSnippets(snippetsData){
        if(!newsnippeteditoropen){
            setsnippetFlag(true);
        }
        setEditSnippetFlag(true);
        //console.log("go here"+snippetsData);
        setEditSnippetData(snippetsData);

    }
    async function getsnippets(){
        
        const snippetResponse=await Axios.get("http://localhost:5000/snippet/");
        setSnippets(snippetResponse.data);
    }
    
    function rendersnippets(){
       let sortedSnippets=[...snippets];
       sortedSnippets=sortedSnippets.sort((a,b)=>{
           return new Date(b.updatedAt)-new Date(a.updatedAt);
       }
       )

       return sortedSnippets.map((snippet,i)=>{
           return <Snippet 
           key={i} 
           getsnippets={getsnippets}
           editsnippets={editSnippets} 
           snippets={snippet}/>

       });
    }

    return(
        <div className="home">
            {!newsnippeteditoropen && (<button className="btn-editor-toggle" onClick={()=>setsnippetFlag(true)}>
                Add Snippet
            </button>
            )}
            {newsnippeteditoropen && (
                <SnippetEditor 
                    setnewsnippeteditoropen={newsnippeteditoropen} 
                    getsnippets={getsnippets}
                    reseteditoropenflag={reseteditoropenflag}
                    editsnippetFlag={editsnippetFlag}
                    editsnippetData={editsnippetData}
                />
            )
            }
            {snippets.length>0 ?( rendersnippets()):user && (<p className="no-snippets-msg">No Snippets have been added yet</p>)}
            {user ===null &&(
                    <div className="no-user-message">
                     <h2>Welcome to Snippet Manager</h2>
                     <Link to="/register">Register here</Link>
                    </div>
                )
            }
        </div>
    )
}

export default Home;