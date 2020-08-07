import React, {useEffect, useState} from "react";

import ProcessService from "../../services/process.service";
import FontAwesome from "react-fontawesome";

import Loading from "../../components/Loading";

export default function ProcessList(props) {

    const [service] = useState(new ProcessService());
    const [processes, setProcesses] = useState([]);
    const [loading, setLoading] = useState(null);

    const getProcesses = () => {
        setLoading(true);
        service.findAll().then((response) => {
            setProcesses(response.data);
        }).finally(() =>{
            setLoading(false);
        });
    };

    const setProcessesLength = () => props.length(processes.length);

    useEffect(getProcesses, [service]);

    useEffect(setProcessesLength, [processes]);

    return (
        <main>
            {loading ? <Loading/> :
                <div>
                    {processes.length > 0 ?
                        <div className="accordion">
                            {processes.map((process, i) => (
                                <div className="card" key={process.id}>

                                    <div className="card-header pointer">
                                        <div className="row align-items-center">
                                            <div className="col">
                                                <div className="h6 font-weight-bold text-muted mb-0"
                                                        data-toggle="collapse" data-target={`#process${i}`}>
                                                    <FontAwesome className="mr-1" name="angle-right"/> {process.title}
                                                </div>
                                            </div>
                                            <div className="col-md-auto text-info border-right">
                                                <FontAwesome className="mr-1" name="users"/> {process.assignTo.length}
                                            </div>
                                            <div className="col-md-auto text-muted border-right">
                                                <FontAwesome className="mr-2" name="calendar"/>
                                                {new Date(process.createdDate).toLocaleDateString()}
                                            </div>

                                            <div className="col-md-auto">
                                                <button type="button" className="btn btn-sm btn-outline-success mr-2"
                                                        onClick={() => props.editProcess(process.id)}>
                                                    <FontAwesome name="pencil"/>
                                                </button>
                                                <button type="button" className="btn btn-sm btn-outline-danger"
                                                        onClick={() => props.deleteProcess(process.id, getProcesses)}>
                                                    <FontAwesome name="trash"/>
                                                </button>
                                            </div>

                                        </div>
                                    </div>

                                    <div id={`process${i}`} className={`collapse ${i === 0 ? 'show' : ''}`}>
                                        <div className="card-body">
                                            <div className="text-muted">{process.description}</div>

                                            <table className="table table-sm table-hover mt-3 mb-0">
                                                <thead>
                                                    <tr className="table-active">
                                                        <th className="pt-2 pb-2 text-center">#</th>
                                                        <th className="pt-2 pb-2">Nome</th>
                                                        <th className="pt-2 pb-2">Data</th>
                                                        <th className="pt-2 pb-2">Parecer</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {process.opinions.length > 0 ?
                                                        (process.opinions.map((op, i) => (
                                                            <tr key={op.id}>
                                                                <td width="7%" className="align-middle text-center">
                                                                    <strong>{i + 1}</strong>
                                                                </td>
                                                                <td className="align-middle text-uppercase">{op.author.name}</td>
                                                                <td className="align-middle">
                                                                    <FontAwesome className="mr-2 text-muted" name="calendar"/>
                                                                    {new Date(op.createdDate).toLocaleDateString()}
                                                                </td>
                                                                <td className="align-middle">{op.text}</td>
                                                            </tr>
                                                        ))) : (
                                                            <tr>
                                                                <td colSpan={4}>
                                                                    <h5 className="text-center text-muted m-3">Não há parecer</h5>
                                                                </td>
                                                            </tr>
                                                        )
                                                    }
                                                </tbody>
                                            </table>
                                            <hr className="mt-0"/>
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
