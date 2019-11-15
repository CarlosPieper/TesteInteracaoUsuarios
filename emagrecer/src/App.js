import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import './App.css';
import PrivateRoute from './PrivateRoute';
import Login from './views/login';
import Feed from './views/feed';
import Profile from './views/profile';
import Register from './views/register';
import { AuthContext } from "./context/auth";

class App extends Component {

  render() {
    return (
      <AuthContext.Provider value={false}>
        <Router>
          <div>
            <PrivateRoute path="/feed" component={Feed} />
            <PrivateRoute path="/perfil" component={Profile} />
            <Route path="/cadastro" component={Register} />
            <Route path="/" component={Login} />
          </div>
        </Router>
      </AuthContext.Provider>
    );
  }
}

export default App;
