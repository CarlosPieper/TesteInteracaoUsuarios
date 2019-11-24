import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { isAuthenticated } from "./services/auth";
import UserList from "./views/userList";
import Register from "./views/register";
import Login from "./views/login";
import Feed from "./views/feed";
import Profile from "./views/profile";
import FriendRequests from "./views/friendRequests";
import Chat from "./views/chat";
import Post from './views/post'
const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            isAuthenticated() ? (<Component {...props} />) :
                (<Redirect to={{ pathname: "/", state: { from: props.location } }} />)}
    />
);

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/cadastro" component={Register} />
            <PrivateRoute path="/usuarios/:name" component={UserList} />
            <PrivateRoute path="/feed" component={Feed} />
            <PrivateRoute path="/solicitacoes" component={FriendRequests} />
            <PrivateRoute path="/perfil/:id" component={Profile} />
            <PrivateRoute path="/post/:id" component={Post} />
            <PrivateRoute path="/mensagens" component={Chat} />
        </Switch>
    </BrowserRouter>
);

export default Routes;