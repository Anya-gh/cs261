import React from "react";
import "./App.css";

function AttendeeAccess(){

    return (
        <div className="Attendacc">
            <h1>Attendee access</h1>
            <section>
                <h3>Access an event as attendee:</h3>
                <br></br>
                <br></br>
                <p style={{textAlign: "center"}}><input type="text" placeholder="Enter key here"></input></p>
                <br></br>
                <p style={{textAlign: "center"}}><input type="text" placeholder="Enter your name here"></input></p>
                <br></br>
                <p style={{textAlign: "center"}}><button>Login</button></p>
            </section>
        </div>
    );
}
// Use <AttendeeAccess />                                   to render
// Use import AttendeeAccess from "./AttendeeAccess";           to import
export default AttendeeAccess;