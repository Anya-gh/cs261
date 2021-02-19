import React from "react";
import "./App.css";

function EventCustomise(){

    return (
        <div className="EventCustomise">
            <h1><u>Create event</u></h1>
            <p style={{textAlign: "center"}}>
                <label for="Event Type">Choose a type of event: </label>
                <select name="Event Type" id="Event Type">
                    <option value="1">Session</option>
                    <option value="2">Series of sessions</option>
                    <option value="3">Project</option>
                </select>
            </p>
            <p style={{textAlign: "center"}}>
                <label>Enter title of the event: </label>
                <input type="text" placeholder="Title"></input>
                <br></br>
                <label>Enter name of host: </label>
                <input type="text" placeholder="Host Name"></input>
            </p>
            <p style={{textAlign: "center"}}>
                <label for="Template">Choose a type of Template: </label>
                <select name="Template" id="Template">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
            </p>
            <p style={{textAlign: "center"}}>
                <label>From </label>
                <input type="time"></input>
                <label> to: </label>
                <input type="time"></input>
            </p>
            <p style={{textAlign: "center"}}>
                <label for="AnalysisFreq">Choose analysis frequency: </label>
                <select name="AnalysisFreq" id="AnalysisFreq">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
            </p>
            <button>Create event</button>
        </div>
    );
}
// Use <EventCustomise />                                   to render
// Use import EventCustomise from "./EventCustomise";           to import
export default EventCustomise;