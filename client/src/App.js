import React from "react";
import Home from "./components/home";
import Carrousel from "./components/Carrousel.jsx";
import Login from "./components/Login.jsx";
import Navbar from "./components/Navbar.jsx";
import Error404 from "./components/error404.jsx"
import Profile from "./components/Profile.jsx";
import { Route, Redirect } from "react-router-dom";
import Sidebar from "./components/sidebar";

var lsName = localStorage.getItem('username')

function App() {
  if(lsName){    
  
  return (
    <div>      
      <Route path="/" component={Navbar} />
      <Route path="/" component={Sidebar} />
      <Route exact path="/home" component={Carrousel} />
      <Route exact path="/home/profile" component={Profile} />
      <Route path="/login" component={Login} /> 
      <Route path="/error" component={Error404} />
          
          
    </div>
  );
  }else{     
    return ( 
    <div>
      <Route path="/error" component={Error404} />
      <Route path="/login" component={Login} />
    </div>
     )    
  }
}

export default App;
