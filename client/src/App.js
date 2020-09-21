import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import Carrousel from "./components/Carrousel.jsx";
import Login from "./components/Login.jsx";
import Navbar from "./components/Navbar.jsx";
import Profile from "./components/Profile.jsx";
import EditProfile from "./components/EditProfile.jsx"
import { getIdUser } from "./actions";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Sidebar from "./components/sidebar";

function App(props) {
  const isAutenticated = () => {
    const token = localStorage.getItem("username");
    
    if (token) {
      return true;
    }
    return false;
  };
  
  const idUser = localStorage.getItem("idUser");
  useEffect(() => {
    props.getIdUser(idUser)
  }, []);


  const PvRoute = (props) =>
    isAutenticated() ? <Route {...props} /> : <Redirect to="./login" />;

  return (
    <div>
      <Router>
        <PvRoute path="/" component={Navbar} />
        <PvRoute path="/" component={Sidebar} />

        <PvRoute exact path="/profile" component={Profile} />

        <PvRoute exact path="/editprofile" component={EditProfile} /> {/*Ruta provisoria señor*/}
      </Router>
      {isAutenticated() === false ? (
        <Route exact path="/login" component={Login} />
      ) : (
        ""
      )}
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    getIdUser: (idUser) => dispatch(getIdUser(idUser)),
  };
};

const mapStateToProps = (state) => {
  return {
    id_user: state.id_user
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
