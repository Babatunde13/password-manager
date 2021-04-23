import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React from 'react'
import AppDashboard from './screens/App';
import Home from "./screens/Home";
import Signin from "./screens/Signin";
import Signup from "./screens/Signup";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/dashboard" component={AppDashboard}/>
        <Route exact path="/login" component={Signin}/>
        <Route exact path="/register" component={Signup}/>
      </Switch>
    </Router>
  )
}

export default App