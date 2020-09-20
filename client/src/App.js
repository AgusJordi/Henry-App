import React from "react";
import Carrousel from "./components/Carrousel.jsx";
import Login from "./components/Login.jsx";
import Navbar from "./components/Navbar.jsx";
import Profile from "./components/Profile.jsx";
import EditProfile from "./components/EditProfile.jsx";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Sidebar from "./components/sidebar";

function App() {
  const isAutenticated = () => {
    const token = localStorage.getItem("username");

    if (token) {
      return true;
    }
    return false;
  };

  const PvRoute = (props) =>
    isAutenticated() ? <Route {...props} /> : <Redirect to="./login" />;

  return (
    <div>
      <Router>
        <PvRoute path="/" component={Navbar} />
        <PvRoute path="/" component={Sidebar} />
        <PvRoute exact path="/profile" component={Profile} />
        <PvRoute exact path="/editprofile" component={EditProfile} /> {/*Ruta provisoria señor*/}
      
      {isAutenticated() === false ? (
        <Route exact path="/login" component={Login} />
        
      ) : (
        ""
      )}
      
      </Router>
    </div>
  );
}

export default App;
