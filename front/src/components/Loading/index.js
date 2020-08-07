import React from "react";

import FontAwesome from 'react-fontawesome';

export default function Loading(props) {

    return (
        <div className={`text-center text-muted ${props.size ? props.size : 'h3'}`}>
            <FontAwesome name="spinner" pulse={true}/>
            <span className="ml-2">{props.message ? props.message : 'Carregando ...'}</span>
        </div>
    );

}
