import React from 'react';
import Home from './components/home'; 
import login from './components/Login.jsx'; 
import Navbar from './components/Navbar.jsx'; 
import {Switch, Route, Link, Redirect} from 'react-router-dom';
import axios from 'axios';
import Sidebar from './components/sidebar';



function App() {
  return (
  	<div>
  	<Route exact path='/' component={Navbar}
        />
    <Route exact path='/'
          component={Sidebar}
      />   
  	<Switch>
      <Route exact path='/home' component={Home} />    
      <Route exact path="/login" component={login} /> 
    </Switch>
    
    
    </div>
  );
}

export default App;
