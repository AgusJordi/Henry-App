import React from 'react';
import Home from './components/home';
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
     <Route
          path='/'
          component={Home}
        />
    </Switch>
    </div>
  );
}

export default App;
