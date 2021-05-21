import { BrowserRouter as Router, Switch, Route, useHistory } from "react-router-dom";
import React from 'react'
import AppDashboard from './screens/App';
import Home from "./screens/Home";
import Signin from "./screens/Signin";
import Signup from "./screens/Signup";
import  EventEmitter from "events";

export const event = new EventEmitter()

const App = () => {
  const history = useHistory()
  window.flash = (message, type="success") => event.emit(
    'flash', 
    ({message, type})
  );
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/dashboard" component={AppDashboard} />
        <Route exact path="/login" component={Signin} />
        <Route exact path="/register" component={Signup} />
        <Route exact path="/logout" component={() => {
          localStorage.clear()
          setTimeout(() => {
            window.flash('Logged out successfully', 'success')
          }, 100)
          history.push('/')
        }} />
      </Switch>
    </Router>
  )
}

export default App