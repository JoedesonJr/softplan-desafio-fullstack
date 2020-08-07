import React, {useState} from "react";

import {useHistory} from "react-router-dom";

import {NotificationManager} from "react-notifications";
import FontAwesome from "react-fontawesome";

import AuthService from "../../services/auth.service";

import './style.css';

export default function Login() {

    const history = useHistory();
    const service = new AuthService();

    const [user, setUser] = useState({username: '', password: ''});
    const [form, setForm] = useState({});

    const handleChange = (e) => {
        const input = e.target;
        setUser({...user, [input.name]: input.value});
        setForm({...form, [input.name]: (input.checkValidity() ? 'is-valid' : '')});
    };

    const handleSubmit = (e) => {
        service.auth(user).then((response) => {
            const url = service.setAuthentication(response.data);
            history.push(url);
        }).catch(() => {
            NotificationManager.error('Identificação Inválida.', 'Atenção');
        });
        e.preventDefault();
    };

    return (
        <main>
            <br/>
            <div className="row justify-content-center mt-5">
                <div className="col-5 bg-light p-5">

                    <form onSubmit={handleSubmit} autoComplete="off">
                        <h3 className="font-weight-light text-center mb-5">Acesse sua conta</h3>

                        <div className="form-group">
                            <input className={`form-control ${form.username}`} name="username" placeholder="Login"
                                   value={user.username} onChange={handleChange} minLength="3" maxLength="20" required/>
                        </div>
                        <div className="form-group mb-0">
                            <input type="password" className={`form-control ${form.password}`} name="password" placeholder="Senha"
                                   value={user.password} onChange={handleChange} minLength="6" maxLength="12" required/>
                        </div>

                        <hr className="mt-4 mb-4"/>
                        <button type="submit" className="btn btn-info float-right btn-block">
                            Entrar <FontAwesome className="ml-1" name="sign-in"/>
                        </button>
                    </form>

                </div>
            </div>
        </main>
    );

}
