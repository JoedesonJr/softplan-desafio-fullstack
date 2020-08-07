import React, {useEffect, useState} from "react";

import ProcessOpinionService from "../../services/process-opinion.service";
import {NotificationManager} from "react-notifications";
import FontAwesome from "react-fontawesome";

import Swal from "sweetalert2";

import ProcessOpinionForm from "./process-opinion-form";
import Loading from "../../components/Loading";

export default function ProcessOpinionList(props) {

    const [service] = useState(new ProcessOpinionService());
    const [processOpinion, setProcessOpinion] = useState([]);
    const [loading, setLoading] = useState(null);

    const getProcessOpinion = () => {
        setLoading(true);
        service.findAllProcessOpinionToUser().then((response) => {
            setProcessOpinion(response.data);
        }).finally(() => {
            setLoading(false);
        });
    };

    const setProcessOpinionLength = () => props.length(processOpinion.length);

    useEffect(getProcessOpinion, [service]);

    useEffect(setProcessOpinionLength, [processOpinion]);

    const saveProcessOpinion = (data) => {
        service.saveProcessOpinion(data).then(() => {
            NotificationManager.success('Salvo com sucesso.', 'Ok');
            getProcessOpinion();
        }).catch((err) => {
            Swal.fire("Atenção", err.response.data.message, "error");
        });
    };

    return (
        <main>
            {loading ? <Loading/> :
                <div>
                    {processOpinion.length > 0 ?
                        <div className="accordion">
                            {processOpinion.map((item, i) => (
                                <div className="card" key={item.processId}>

                                    <div className="card-header pointer">
                                        <div className="row align-items-center">
                                            <div className="col">
                                                <div className="h6 font-weight-bold text-muted mb-0"
                                                        data-toggle="collapse" data-target={`#process${i}`}>
                                                    <FontAwesome className="mr-1" name="angle-right"/> {item.title}
                                                </div>
                                            </div>
                                            <div className="col-md-auto text-muted">
                                                <FontAwesome className="mr-2" name="calendar"/>
                                                {new Date(item.processCreatedDate).toLocaleDateString()}
                                            </div>
                                        </div>
                                    </div>

                                    <div id={`process${i}`} className={`collapse ${i === 0 ? 'show' : ''}`}>
                                        <div className="card-body">
                                            <span className="text-muted">{item.description}</span>
                                            <hr/>
                                            <ProcessOpinionForm processOpinion={item} handleSubmit={saveProcessOpinion}/>
                                        </div>
                                    </div>

                                </div>
                            ))}
                        </div> :

                        <h4 className="text-center text-muted m-3">Não há processos cadastrados</h4>
                    }
                </div>
            }
        </main>
    );

}
