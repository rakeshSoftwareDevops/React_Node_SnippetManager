import axios from 'axios';
import './App.css';
import {UserContextProvider} from "./context/UserContext";
import Router from './Router'; 
import "./styles/index.scss";

axios.defaults.withCredentials=true;
function App() {
  return (
    <UserContextProvider>
        <div className='container'>
          <Router/>
        </div>
    </UserContextProvider>
    
  );
}

export default App;
