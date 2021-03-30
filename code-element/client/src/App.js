import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./components/pages/Home";
import Team from "./components/pages/Team";
import Elements from "./components/pages/Elements";
import Contribute from "./components/pages/Contribute";
import Login from "./components/pages/Login";
import LogOut from "./components/pages/logout";


import ElementState from './context/element/elementState';
// import "./App.css";


function App() {
  return (
    <ElementState>
    <Router>
      <Switch>
        <Route exact path='/elements'>
          <Elements />
          
        </Route>
        <Route exact path='/contribute'>
          <Contribute />
          
        </Route>
        <Route exact path='/team'>
          <Team />
        </Route>
        <Route exact path='/'>
        <Login />
        </Route>
          <Route exact path='/home'>
            <Home />
          </Route>
          <Route exact path='/logout'>
            <LogOut />
          </Route>
      </Switch>
    </Router>
    </ElementState>
  );
}

export default App;
