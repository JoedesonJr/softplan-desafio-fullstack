import React, {useState} from "react";
import Header from "../../components/Header";
import FontAwesome from "react-fontawesome";

import ProcessOpinionList from "./process-opinion-list";

export default function ProcessOpinion() {

    const [processOpinionLength, setProcessOpinionLength] = useState(0);

    return (
        <main>
            <Header title="Meus Processos" icon="bookmark"/>

            <div className="row align-items-center mb-3">
                <div className="col-md-auto text-muted">
                    <FontAwesome className="mr-1" name="calculator"/> Total de {processOpinionLength} processo(s)
                </div>
            </div>

            <ProcessOpinionList length={setProcessOpinionLength}/>
        </main>
    );

}
