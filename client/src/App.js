import React from "react";
import Home from "./components/home";
import Carrousel from "./components/Carrousel.jsx";
import Login from "./components/Login.jsx";
import Navbar from "./components/Navbar.jsx";
import Error404 from "./components/error404.jsx"
import Profile from "./components/Profile.jsx";
import {BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
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
        
        <PvRoute path="/" component={Navbar} />
        <PvRoute path="/" component={Sidebar} />
        <PvRoute exact path="/home" component={Carrousel} />       
        <PvRoute exact path="/profile" component={Profile} />
           
        {isAutenticated() == false ? <Route exact path="/login" component={Login} /> : '' }
                  
      </div>
    )
   
 

  // <div>
  //       <Route exact path="/login" component={Login} /> 
  //       <Route exact path="/error" component={Error404} />
  // </div>
   
      
     
   
}

export default App;
