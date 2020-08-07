import React, {useEffect, useState} from "react";

import {useHistory} from "react-router-dom";

import FontAwesome from "react-fontawesome";
import Select from 'react-select';

import ProcessService from "../../services/process.service";

export default function ProcessForm(props) {

    const history = useHistory();

    const [service] = useState(new ProcessService());
    const [process, setProcess] = useState(props.process);
    const [users, setUsers] = useState([]);
    const [form, setForm] = useState({});

    useEffect(() => {
        service.findAllUsersFinishers().then((response) => {
            setUsers(response.data);
        });
    }, [service]);

    const handleChange = (e) => {
        const input = e.target;
        setProcess({...process, [input.name]: input.value});
        setForm({...form, [input.name]: (input.checkValidity() ? 'is-valid' : '')});
    };

    const handleSelectedChange = (selectedUsers) => {
        setProcess({...process, 'assignTo': selectedUsers});
    };

    const handleSubmit = (e) => {
        props.handleSubmit(process, () => {
            setProcess(props.process);
            setForm({});
        });
        e.preventDefault();
    };

    return (
        <div className="row mb-3">
            <div className="col-2">
                <button type="button" className="btn btn-outline-secondary" onClick={() => history.push('/process')}>
                    <FontAwesome className="mr-1" name="arrow-left"/> Voltar
                </button>
            </div>
            <div className="col-8">

                <form onSubmit={handleSubmit} autoComplete="off">
                    <div className="form-group row">
                        <label className="col-2 col-form-label text-right">
                            Título <strong className="text-danger">*</strong>
                        </label>
                        <div className="col">
                            <input className={`form-control ${form.title}`} name="title"
                                    value={process.title} onChange={handleChange} minLength="3" maxLength="100" required/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-2 col-form-label text-right">Descrição</label>
                        <div className="col">
                            <textarea className={`form-control ${form.description}`} name="description" rows="3"
                                    value={process.description} onChange={handleChange}></textarea>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-2 col-form-label text-right">Usuário(s)</label>
                        <div className="col">
                            <Select isMulti isSearchable placeholder=""
                                options={users}
                                defaultValue={process.assignTo}
                                onChange={handleSelectedChange}
                                getOptionLabel={user => user.name}
                                getOptionValue={user => user.id}
                                noOptionsMessage={() => 'Não há usuários'}
                                closeMenuOnSelect={false}/>

                            <small className="text-muted">
                                <FontAwesome className="mr-1" name="info-circle"/>
                                Atribuia um ou mais usuários a realizar um parecer sobre um processo.
                            </small>
                        </div>
                    </div>

                    <div className="row justify-content-end mt-3">
                        <div className="col-10">
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
