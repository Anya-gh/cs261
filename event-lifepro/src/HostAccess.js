import React from "react";
import "./App.css";

import {Route, Link} from 'react-router-dom';

function HostAccess(){

    return (
        <div className="Hostacc">
            <h2>Host access</h2>
            <h3>Access an event as host:</h3>
            <input type="text" placeholder="Enter key here"></input>
            <button>Login</button>
            <h3>OR</h3>
            <button>
                <Link to="/EventCreate">Create New Event</Link>
            </button>
        </div>
    );
}
// Use <HostAccess />                                   to render
// Use import HostAccess from "./HostAccess";           to import
export default HostAccess;