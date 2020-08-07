import React, {useState} from "react";

import FontAwesome from "react-fontawesome";

export default function ProcessOpinionForm(props) {

    const [processOpinion, setProcessOpinion] = useState(props.processOpinion);
    const [form, setForm] = useState({});

    const handleChange = (e) => {
        const input = e.target;
        setProcessOpinion({...processOpinion, [input.name]: input.value});
        setForm({...form, [input.name]: (input.checkValidity() ? 'is-valid' : '')});
    };

    const handleSubmit = (e) => {
        props.handleSubmit(processOpinion);
        e.preventDefault();
    };

    return (
        <div className="row">
            <div className="col">

                <form onSubmit={handleSubmit} autoComplete="off">
                    <div className="form-group">
                        <div className="mb-2 font-weight-bold">Parecer</div>
                        <textarea className={`form-control ${form.text}`} name="text" rows="4"
                                value={processOpinion.text} onChange={handleChange} required></textarea>
                    </div>
                    {processOpinion.opinionId ? (
                        <div className="float-left">
                            <small className="text-muted">
                                <FontAwesome className="mr-2" name="calendar"/>
                                {new Date(processOpinion.opinionCreatedDate).toLocaleDateString()}
                            </small>
                        </div>
                    ) : ('')}
                    <div className="float-right">
                        <button type="submit" className="btn btn-info">
                            Salvar <FontAwesome className="ml-1" name="save"/>
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );

}
