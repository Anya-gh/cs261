import React from "react";
import "./App.css";

function EventCustomise(){

    return (
        <div className="EventCustomise">
            <h1>Create event</h1>
            <section style={{textAlign: "center"}}>
                <fieldset>
                    <legend>Event information</legend>
                    <br></br>
                    <label htmlFor="Event Title">Enter title of the event: </label>
                    <input name="Event Title" id="Event Title" type="text" placeholder="Event Title"></input>
                    <br></br><br></br>
                    <label htmlFor="Host Name">Enter name of host: </label>
                    <input name="Host Name" id="Host Name" type="text" placeholder="Host Name"></input>
                    <br></br><br></br>
                    <label htmlFor="Start Time">From </label>
                    <input name="Start Time" id="Start Time" type="time"></input>
                    <label htmlFor="End Time"> to: </label>
                    <input name="endTime" id="End Time" type="time"></input>
                    <br></br><br></br>
                </fieldset>
            </section>
            <section style={{textAlign: "center"}}>
                <fieldset>
                    <legend>Event settings</legend>
                    <br></br>
                    <label htmlFor="Event Type">Choose a type of event: </label>
                    <select name="Event Type" id="Event Type">
                        <option value="1">Session</option>
                        <option value="2">Series of sessions</option>
                        <option value="3">Project</option>
                    </select>
                    <br></br><br></br>
                    <label htmlFor="AnalysisFreq">Choose analysis frequency: </label>
                    <input name="AnalysisFreq" id="AnalysisFreq" type="number" size="10"></input>
                    <select name="AnalysisFreqMagnitude" aria-label="AnalysisFreqMagnitude">
                        <option value="1">minutes</option>
                        <option value="2">hours</option>
                        <option value="3">days</option>
                        <option value="4">weeks</option>
                    </select>
                    <br></br><br></br>
                </fieldset>
            </section>
            <section style={{textAlign: "center"}}>
                <label htmlFor="Template">Choose a type of Template: </label>
                <select name="Template" id="Template">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
            </section>
            <button>Create new event</button>
        </div>
    );
}
// Use <EventCustomise />                                   to render
// Use import EventCustomise from "./EventCustomise";           to import
export default EventCustomise;