import React from "react";

import FontAwesome from 'react-fontawesome';

export default function Header(props) {

    return (
        <header className="mb-5">
            <h2 className="font-weight-light">
                {props.title} <FontAwesome className="float-md-right text-info" name={props.icon}/>
            </h2>
            <hr/>
        </header>
    );

}
