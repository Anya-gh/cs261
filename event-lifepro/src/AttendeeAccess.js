import React from "react";
import "./App.css";

function AttendeeAccess(){

    return (
        <div className="Attendacc">
            <h2>Attendee access</h2>
            <h3>Access an event as attendee:</h3>
            <input type="text" placeholder="Enter key here"></input>
            <input type="text" placeholder="Enter your name here"></input>
            <button>Login</button>
        </div>
    );
}
// Use <AttendeeAccess />                                   to render
// Use import AttendeeAccess from "./AttendeeAccess";           to import
export default AttendeeAccess;