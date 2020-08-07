import React, {useEffect, useState} from "react";

import {useHistory} from "react-router-dom";

import logo from "../../assets/softplan-logo.png";
import './style.css';

import FontAwesome from 'react-fontawesome'
import AuthService from "../../services/auth.service";

export default function Navbar() {

    const history = useHistory();
    const authService = new AuthService();

    const [user, setUser] = useState(authService.getLoggedUser());
    const [roleName, setRoleName] = useState('');

    const getRoleName = () => {
        if (user) {
            switch (user.role) {
                case 'ROLE_ADMIN':    return 'Administrador';
                case 'ROLE_TRIATOR':  return 'Triador';
                case 'ROLE_FINISHER': return 'Finalizador';
                default:
                    return '';
            }
        }
        return '';
    }

    useEffect(() => {
        const role = getRoleName();
        setRoleName(role);
    }, [user]);

    const logout = () => {
        authService.logout();
        history.push('/');
    };

    history.listen(() => setUser(authService.getLoggedUser()));

    return (
        <div>
            {user && user.id ? (
                <nav className="navbar navbar-expand-lg nav-blue nav-border pl-5 pr-5">
                    <div className="navbar-brand ml-4">
                        <img src={logo} alt="Logo" width="120"/>
                    </div>
                    <div className="collapse navbar-collapse mr-4">
                        <ul className="navbar-nav ml-auto text-white">
                            <li className="nav-item pr-4 mr-4 border-right">
                                <h5 className="nav-link mb-0 font-weight-light">{roleName}</h5>
                            </li>
                            <li className="nav-item mr-2">
                                <span className="nav-link">
                                    <FontAwesome className="mr-1 text-info" name="user"/> {user ? user.name : ''}
                                </span>
                            </li>
                            <li className="nav-item pointer">
                                <span className="nav-link" onClick={logout}>
                                    Sair <FontAwesome className="ml-1 text-info" name="sign-out"/>
                                </span>
                            </li>
                        </ul>
                    </div>
                </nav>
            ) : ''}
        </div>
    );

}
