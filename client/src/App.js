import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import UserManageMent from "./components/dashboard/UserManagement";
import Create from "./components/dashboard/Create";

import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

// Check for token to keep user logged in


if (localStorage.jwtToken) {
  // Set auth token header auth
  var token = localStorage.jwtToken;
  
  // token = token.replace("Bearer ", "");
  setAuthToken(token);

  // Decode token and get user info and exp
  const decoded = jwt_decode(token);

   // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "./login";
  }
}
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/" component={Login} />         
                      
            <Switch>               
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/userManagement" component={UserManageMent} />
              <PrivateRoute exact path="/create" component={Create} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;
