import React from 'react';

import {NotificationContainer} from "react-notifications";

import Routes from "./routes";

export default function App() {

    return (
        <div>
            <Routes/>
            <NotificationContainer/>
        </div>
    );

}
