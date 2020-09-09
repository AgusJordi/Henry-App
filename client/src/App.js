import React from 'react';
import Home from './components/home';
import {Switch, Route, Link, Redirect} from 'react-router-dom';
import axios from 'axios';

function App() {
  return (
  	<Switch>
     <Route
          path='/home'
          component={Home}
        />
    </Switch>
  );
}

export default App;
