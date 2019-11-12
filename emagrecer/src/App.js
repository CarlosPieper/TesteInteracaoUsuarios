import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Login from './views/login';
import Feed from './views/feed';
import Profile from './views/profile';





class App extends Component {

  render() {
    return (
      <div>
          <Switch>
            <Route path="/home" component={Feed} />
            <Route path="/perfil" component={Profile} />
            <Route path="/" component={Login}/>
          </Switch>
     
      
      </div>


    );
  }

}




export default App;
