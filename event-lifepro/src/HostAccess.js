import React from "react";
import "./App.css";

import {Route, Link} from 'react-router-dom';

function HostAccess(){

    return (
        <div className="Hostacc">
            <h1>Host access</h1>
            <p style={{textAlign: "center"}}>
                <h3>Access an event as host:</h3>
                <br></br>
                <br></br>
                <p style={{textAlign: "center"}}><input type="text" placeholder="Enter key here"></input></p>
                <br></br>
                <p style={{textAlign: "center"}}><button>Login</button></p>
                <br></br>
                <br></br>
                <p style={{textAlign: "center"}}><button>
                    <Link to="/EventCreate">Create New Event</Link>
                </button></p>
            </p>
        </div>
    );
}
// Use <HostAccess />                                   to render
// Use import HostAccess from "./HostAccess";           to import
export default HostAccess;