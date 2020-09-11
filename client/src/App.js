import React from "react";
import Home from "./components/home";
import login from "./components/Login.jsx";
import Navbar from "./components/Navbar.jsx";
import Profile from "./components/Profile.jsx";
import { Route } from "react-router-dom";
import Sidebar from "./components/sidebar";



function App() {
  return (
    <div>
      <Route path="/" component={Navbar} />
      <Route path="/" component={Sidebar} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/home/profile" component={Profile} />
      <Route path="/login" component={login} />
    </div>
  );
}

export default App;
