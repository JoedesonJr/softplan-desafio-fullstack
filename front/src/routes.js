import React from "react";
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';

import AuthService from "./services/auth.service";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";

import Login from "./pages/Login";

import Users from "./pages/Users";
import UserNew from "./pages/Users/user-new";
import UserEdit from "./pages/Users/user-edit";

import Process from "./pages/Process";
import ProcessNew from "./pages/Process/process-new";
import ProcessEdit from "./pages/Process/process-edit";

import ProcessOpinion from "./pages/ProcessOpinion";

const authService = new AuthService();

/* para estas rotas é necessário estar autenticado e ter a permissão necessária */
const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={props => (
        authService.isAuthenticated() && authService.hasRole(rest.role) ?
            (<Component {...props}/>) :
            (<Redirect to={ {pathname: authService.redirect(), state: {from: props.location}} }/>)
    )}/>
);

/* não deixa acessar a tela de login se já estiver logado */
const AuthGuard = ({component: Component, ...rest}) => (
    <Route {...rest} render={props => (
        authService.isAuthenticated() ?
            (<Redirect to={ {pathname: authService.redirect(), state: {from: props.location}} }/>) :
            (<Component {...props}/>)
    )}/>
);

const Routes = () => {
    return(
        <BrowserRouter>
            <Navbar/>
            <div className="container-fluid mt-5 mb-5 pb-5">
                <div className="row justify-content-center">
                    <div className="col-9">
                        <Switch>
                            <AuthGuard exact path="/" component={Login}></AuthGuard>

                            <PrivateRoute exact path="/users" role="ADMIN" component={Users}></PrivateRoute>
                            <PrivateRoute exact path="/users/new" role="ADMIN" component={UserNew}></PrivateRoute>
                            <PrivateRoute exact path="/users/edit/:id" role="ADMIN" component={UserEdit}></PrivateRoute>

                            <PrivateRoute exact path="/process" role="TRIATOR" component={Process}></PrivateRoute>
                            <PrivateRoute exact path="/process/new" role="TRIATOR" component={ProcessNew}></PrivateRoute>
                            <PrivateRoute exact path="/process/edit/:id" role="TRIATOR" component={ProcessEdit}></PrivateRoute>

                            <Route exact path="/process-opinion" role="FINISHER" component={ProcessOpinion}></Route>

                            <Route path="*" component={NotFound}></Route>
                        </Switch>
                    </div>
                </div>
            </div>
            <Footer/>
        </BrowserRouter>
    );
}

export default Routes;
