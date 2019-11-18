import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { isAuthenticated } from "./services/auth";

import Register from "./views/register";
import Login from "./views/login";
import Feed from "./views/feed";
import Profile from "./views/profile";
const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            isAuthenticated ? (<Component {...props} />) :
                (<Redirect to={{ pathname: "/", state: { from: props.location } }} />)}
    />
);

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/cadastro" component={Register} />
            <PrivateRoute path="/feed" component={Feed} />
            <PrivateRoute path="/perfil" component={Profile} />
        </Switch>
    </BrowserRouter>
);

export default Routes;