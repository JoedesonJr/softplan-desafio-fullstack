import React from "react";

import {useHistory} from "react-router-dom";

import Swal from "sweetalert2";

import ProcessService from "../../services/process.service";

import Header from "../../components/Header";
import ProcessForm from "./process-form";

export default function ProcessNew() {

    const history = useHistory();
    const service = new ProcessService();

    const initProcess = {id: null, title: '', description: '', assignTo: []};

    const saveProcess = (process, saveAgain) => {
        service.saveProcess(process).then(() => {
            successCallback(saveAgain)
        }).catch((err) => {
            Swal.fire("Atenção", err.response.data.message, "error");
        });
    };

    const successCallback = (saveAgain) => {
        Swal.fire({
            title: 'OK',
            text: "Deseja cadastrar um novo processo ?",
            icon: 'success',
            showCancelButton: true,
            confirmButtonText: 'Sim',
            cancelButtonText: 'Não',
            confirmButtonColor: '#17a2b8'
        }).then((result) => {
            result.value ? saveAgain() : history.push('/process');
        })
    };

    return (
        <main>
            <Header title="Novo Processo" icon="archive"/>
            <ProcessForm process={initProcess} handleSubmit={saveProcess}/>
        </main>
    );

}
