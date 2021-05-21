import { 
  BrowserRouter as Router, 
  Switch, 
  Route, 
  useHistory,
  Redirect
} from "react-router-dom";
import EventEmitter from "events";
import AppDashboard from './screens/App';
import Home from "./screens/Home";
import Signin from "./screens/Signin";
import Signup from "./screens/Signup";

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
          if (!localStorage.getItem('userId')) {
            setTimeout(() => {
              window.flash('You were not logged in', 'warning')
            }, 100)
          } else {
            localStorage.clear()
            setTimeout(() => {
              window.flash('Logged out successfully', 'success')
            }, 100)
          }
          return <Redirect to='/' />
        }} />
      </Switch>
    </Router>
  )
}

export default App