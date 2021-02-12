import React from "react";
import "./App.css";

function EventCustomise(){

    return (
        <div className="EventCustomise">
            <h1><u>Create event</u></h1>
            <label for="Event Type">Choose a type of event: </label>
            <select name="Event Type" id="Event Type">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
            </select>
            <label for="Template">Choose a type of Template: </label>
            <select name="Template" id="Template">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
            </select>
            <input type="text" placeholder="Title"></input>
            <input type="text" placeholder="Host Name"></input>
            <input type="time"></input>
            <label>to:</label>
            <input type="time"></input>
            <label for="AnalysisFreq">Choose analysis frequency: </label>
            <select name="AnalysisFreq" id="AnalysisFreq">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
            </select>
        </div>
    );
}
// Use <EventCustomise />                                   to render
// Use import EventCustomise from "./EventCustomise";           to import
export default EventCustomise;