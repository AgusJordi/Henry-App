import React from 'react';
import Home from './components/home';
import login from './components/Login';
import Navbar from './components/Navbar.jsx';
import {Switch, Route, Link, Redirect} from 'react-router-dom';
import axios from 'axios';
import Sidebar from './components/sidebar';

function App() {

  return (
  	<div>
  	<Route
      path='/'
      component={Navbar}
    />
    <Route
      path='/'
      component={Sidebar}
    />
  	<Switch>
      <Route path='/home' component={Home} />    
      <Route path="/login" component={login} /> 
    </Switch>
    </div>
  );
}

export default App;
