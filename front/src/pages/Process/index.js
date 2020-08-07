import React, {useState} from "react";

import {useHistory} from "react-router-dom";

import {NotificationManager} from "react-notifications";
import FontAwesome from "react-fontawesome";
import Swal from "sweetalert2";

import ProcessService from "../../services/process.service";

import ProcessList from "./process-list";
import Header from "../../components/Header";

export default function Process() {

    const history = useHistory();

    const [service] = useState(new ProcessService());
    const [processLength, setProcessLength] = useState(0);

    const newProcess = () => history.push('/process/new');

    const editProcess = (id) => history.push('/process/edit/' + id);

    const deleteProcess = (id, callback) => {
        Swal.fire({
            text: "Deseja realmente deletar este processo ?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sim',
            cancelButtonText: 'Não',
            confirmButtonColor: '#17a2b8'
        }).then((result) => {
            if (result.value) {
                service.deleteById(id).then(() => {
                    NotificationManager.success('Deletado com sucesso.', 'Ok');
                    callback();
                });
            }
        });
    };

    return (
        <main>
            <Header title="Gerenciar Processos" icon="archive"/>

            <div className="row align-items-center mb-3">
                <div className="col">
                    <button type="button" className="btn btn-info" onClick={newProcess}>
                        <FontAwesome className="mr-1" name="plus"/> Novo Processo
                    </button>
                </div>
                <div className="col-md-auto text-muted">
                    <FontAwesome className="mr-1" name="calculator"/> Total de {processLength} processo(s)
                </div>
            </div>

            <ProcessList editProcess={editProcess} deleteProcess={deleteProcess} length={setProcessLength}/>
        </main>
    );

}
