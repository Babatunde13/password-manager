import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React from 'react'
import AppDashboard from './screens/App';
import Home from "./screens/Home";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/dashboard" component={AppDashboard}/>
      </Switch>
    </Router>
  )
}

export default App