import React, {useEffect, useState} from "react";

import {useHistory, useParams} from "react-router-dom";

import {NotificationManager} from "react-notifications";
import ProcessService from "../../services/process.service";

import Swal from "sweetalert2";

import Header from "../../components/Header";
import Loading from "../../components/Loading";
import ProcessForm from "./process-form";

export default function ProcessEdit() {

    const {id} = useParams();
    const history = useHistory();

    const [service] = useState(new ProcessService());
    const [process, setProcess] = useState();
    const [loading, setLoading] = useState(null);

    const getProcess = () => {
        setLoading(true);
        service.findById(id).then((response) => {
            if (response.data && response.data.id) {
                setProcess(response.data);
            } else {
                setTimeout(() => history.push('/process'), 2000);
            }
        }).finally(() => {
            setLoading(false);
        });
    };

    useEffect(getProcess, [service]);

    const editProcess = (process) => {
        service.editProcess(process).then(() => {
            NotificationManager.success('Salvo com sucesso.', 'Ok');
            history.push('/process');
        }).catch((err) => {
            Swal.fire("Atenção", err.response.data.message, "error");
        });
    };

    return (
        <main>
            <Header title="Editar Processo" icon="pencil"/>

            {loading ? <Loading/> : (
                <div>
                    {process && process.id ?
                        <ProcessForm process={process} handleSubmit={editProcess}/> :
                        <h3 className="text-muted text-center">Processo não encontrado</h3>
                    }
                </div>
            )}
        </main>
    );

}
