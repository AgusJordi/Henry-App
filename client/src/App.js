import React from 'react';
import Home from './components/home';
 
import login from './components/Login.jsx';
 
import Navbar from './components/Navbar.jsx';
 
import {Switch, Route, Link, Redirect} from 'react-router-dom';
import axios from 'axios';

function App() {
  return (
  	<div>
  	<Route
          path='/'
          component={Navbar}
        />
  	<Switch>
 
     <Route path='/home' component={Home} />    
     <Route path="/login" component={login} /> 
    </Switch>
    
    

  );
}

export default App;
