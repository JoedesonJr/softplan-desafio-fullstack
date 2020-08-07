import React, {useState} from "react";

import {useHistory} from "react-router-dom";

import FontAwesome from "react-fontawesome";

export default function UserForm(props) {

    const history = useHistory();

    const [user, setUser] = useState(props.user);
    const [form, setForm] = useState({});

    const handleChange = (e) => {
        const input = e.target;
        setUser({...user, [input.name]: input.value});
        setForm({...form, [input.name]: (input.checkValidity() ? 'is-valid' : '')});
    };

    const handleSubmit = (e) => {
        props.handleSubmit(user, () => {
            setUser(props.user);
            setForm({});
        });
        e.preventDefault();
    };

    return (
        <div className="row mb-3">
            <div className="col-2">
                <button type="button" className="btn btn-outline-secondary" onClick={() => history.push('/users')}>
                    <FontAwesome className="mr-1" name="arrow-left"/> Voltar
                </button>
            </div>
            <div className="col-8">

                <form onSubmit={handleSubmit} autoComplete="off">
                    <div className="form-group row">
                        <label className="col-2 col-form-label text-right">Nome</label>
                        <div className="col">
                            <input className={`form-control ${form.name}`} name="name"
                                    value={user.name} onChange={handleChange} minLength="3" maxLength="100" required/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-2 col-form-label text-right">Login</label>
                        <div className="col">
                            <input className={`form-control ${form.username}`} name="username"
                                    value={user.username} onChange={handleChange} minLength="3" maxLength="20" required/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-2 col-form-label text-right">Senha</label>
                        <div className="col">
                            <input type="password" className={`form-control ${form.password}`} name="password"
                                   value={user.password} onChange={handleChange} minLength="6" maxLength="12"
                                   readOnly={user.id} required/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-2 col-form-label text-right">Perfil</label>
                        <div className="col">
                            <select className={`custom-select ${form.role}`} name="role"
                                    value={user.role} onChange={handleChange} required>
                                <option></option>
                                <option value="ROLE_ADMIN">Administrador</option>
                                <option value="ROLE_TRIATOR">Triador</option>
                                <option value="ROLE_FINISHER">Finalizador</option>
                            </select>
                        </div>
                    </div>

                    <div className="row justify-content-end mt-4">
                        <div className="col-10">
                            <div className="float-left mt-1">
                                <small className="text-muted">
                                    <FontAwesome className="mr-1" name="info-circle"/> Todos os campos são obrigatórios.
                                </small>
                            </div>
                            <div className="float-right">
                                <button type="submit" className="btn btn-info">
                                    Salvar <FontAwesome className="ml-1" name="save"/>
                                </button>
                            </div>
                        </div>
                    </div>
                </form>

            </div>
        </div>
    );

}
