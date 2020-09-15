import React from "react"; 
import Carrousel from "./components/Carrousel.jsx";
import Login from "./components/Login.jsx";
import AreaAdmin from "./components/Crud/AreaAdmin.jsx";
import Navbar from "./components/Navbar.jsx"; 
import Profile from "./components/Profile.jsx";
import {BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Sidebar from "./components/sidebar";
import decode from "jwt-decode"




function App() {   

  const isAutenticated = ()=> {
    const token = localStorage.getItem('username')
     
    if(token){
      return true
    }
    return false 
     
  }
  
  const PvRoute  = (props)=>(  
    
    isAutenticated()
    ? <Route  {... props} />
    : <Redirect to= "./login" />

  )
  
 
  
  return (
    <div>   
        <Router>
        <PvRoute path="/" component={Navbar} />
        <PvRoute path="/" component={Sidebar} />
        <PvRoute exact path="/home" component={Carrousel} />       
        <PvRoute exact path="/profile" component={Profile} />
        <PvRoute exact path="/crud" component={AreaAdmin} />
        </Router> 
        {isAutenticated() == false ? <Route exact path="/login" component={Login} /> : '' }
             
      </div>
    )
    
   
   
}

export default App;
