import React from 'react';
import Home from './components/home';
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
     {/* <Route
          path='/'
          component={Home}
        /> */}
    </Switch>
    </div>
  );
}

export default App;
