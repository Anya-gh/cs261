import React, { useState } from "react";

import Head from "./Head";
import Apidev from "./Apidev";

import { Route, Link } from 'react-router-dom';


function EventCreate() {
    //Java script Logic


    // Need to set the ID of the meeting here
    // This is a placeholder
    const [id, setId] = useState("0");


    const [template, setTemplate] = useState();

    const [eventTitle, setEventTitle] = useState("");
    const [hostName, setHostName] = useState([]);
    const [startTime, setStartTime] = useState("00:00:00");
    const [endTime, setEndTime] = useState("00:00:00");
    const [eventType, setEventType] = useState(0);
    const [freqVal, setFreqVal] = useState(0);
    const [freqScale, setFreqScale] = useState(0);

    const updateEventTitle = e => {
        setEventTitle(e.target.value);
    };

    const updateHostName = e => {
        setHostName(e.target.value);
    };


    const updatestartTime = e => {
        setStartTime(e.target.value);
    };

    const updateEndTime = e => {
        setEndTime(e.target.value);
    };

    const updateEventType = e => {
        setEventType(e.target.value);
    };

    const updateFreqVal = e => {
        setFreqVal(e.target.value);
    };

    const updateFreqScale = e => {
        setFreqScale(e.target.value);
    };

    {/* This need to be fixed after the DB code is changed*/}
    const updateTemplate = e => {
        setTemplate(Apidev.Query("template", id));
        updateQuestion1(template.questions[0]);
        updateQuestion2(template.questions[1]);
        updateQuestion3(template.questions[2]);
        updateQuestion4(template.questions[3]);
        updateQuestion5(template.questions[4]);
        updateQuestion6(template.questions[5]);
        updateQuestion7(template.questions[6]);
        updateQuestion8(template.questions[7]);
        updateQuestion9(template.questions[8]);
        updateQuestion10(template.questions[9]);
    };

    const updateId = e => {
        setId(e.target.value);
    };

    const [question1, setQuestion1] = useState("");
    const [question2, setQuestion2] = useState("");
    const [question3, setQuestion3] = useState("");
    const [question4, setQuestion4] = useState("");
    const [question5, setQuestion5] = useState("");
    const [question6, setQuestion6] = useState("");
    const [question7, setQuestion7] = useState("");
    const [question8, setQuestion8] = useState("");
    const [question9, setQuestion9] = useState("");
    const [question10, setQuestion10] = useState("");

    const updateQuestion1 = e => {
        setQuestion1(e.target.value);
    };
    const updateQuestion2 = e => {
        setQuestion2(e.target.value);
    };
    const updateQuestion3 = e => {
        setQuestion3(e.target.value);
    };
    const updateQuestion4 = e => {
        setQuestion4(e.target.value);
    };
    const updateQuestion5 = e => {
        setQuestion5(e.target.value);
    };
    const updateQuestion6 = e => {
        setQuestion6(e.target.value);
    };
    const updateQuestion7 = e => {
        setQuestion7(e.target.value);
    };
    const updateQuestion8 = e => {
        setQuestion8(e.target.value);
    };
    const updateQuestion9 = e => {
        setQuestion9(e.target.value);
    };
    const updateQuestion10 = e => {
        setQuestion10(e.target.value);
    };


    return (
        //JSX aka HTML Code
        <div className="EventCreate">
            {/* This is how to comment in JSX*/}
            <Head compname="Event LiFePro" slogan="The live feedback provider" />

            <h1>Create event</h1>
            <section style={{ textAlign: "center" }}>
                <fieldset>
                    <legend>Event information</legend>
                    <br></br>
                    <label htmlFor="Event Title">Enter title of the event: </label>
                    <input onChange={updateEventTitle} name="Event Title" id="Event Title" type="text" placeholder="Event Title"></input>
                    <br></br><br></br>
                    <label htmlFor="Host Name">Enter name of host: </label>
                    <input onChange={updateHostName} name="Host Name" id="Host Name" type="text" placeholder="Host Name"></input>
                    <br></br><br></br>
                    <label htmlFor="Start Time">From </label>
                    <input onChange={updatestartTime} name="Start Time" id="Start Time" type="time"></input>
                    <label htmlFor="End Time"> to: </label>
                    <input onChange={updateEndTime} name="End Time" id="End Time" type="time"></input>
                    <br></br><br></br>
                </fieldset>
            </section>
            <section style={{ textAlign: "center" }}>
                <fieldset>
                    <legend>Event settings</legend>
                    <br></br>
                    <label htmlFor="Event Type">Choose a type of event: </label>
                    <select onChange={updateEventType} name="Event Type" id="Event Type">
                        <option value="1">Session</option>
                        <option value="2">Series of sessions</option>
                        <option value="3">Project</option>
                    </select>
                    <br></br><br></br>
                    <label htmlFor="AnalysisFreq">Choose analysis frequency: </label>
                    <input onChange={updateFreqVal} name="AnalysisFreqVal" id="AnalysisFreqVal" type="number" size="10"></input>
                    <select onChange={updateFreqScale} name="AnalysisFreqMagnitude" aria-label="AnalysisFreqMagnitude">
                        <option value="1">minutes</option>
                        <option value="2">hours</option>
                        <option value="3">days</option>
                        <option value="4">weeks</option>
                    </select>
                    <br></br><br></br>
                </fieldset>
            </section>
            <section style={{ textAlign: "center" }}>
                <label htmlFor="Template">Import a Template: </label>
                <select onChange={updateId} name="Template" id="Template">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                <br></br>
                <button onclick={updateTemplate}>Import Template</button>
                <br></br>

                {/*Question section*/}

                {/* Current Questions */}
                <label><u>Current questions in template:</u></label>
                <br></br>
                <input onChange={updateQuestion1} name="question1string" id="question1string" type="text" placeholder={question1}></input>
                <br></br>
                <input onChange={updateQuestion2} name="question2string" id="question2string" type="text" placeholder={question2}></input>
                <br></br>
                <input onChange={updateQuestion3} name="question3string" id="question3string" type="text" placeholder={question3}></input>
                <br></br>
                <input onChange={updateQuestion4} name="question4string" id="question4string" type="text" placeholder={question4}></input>
                <br></br>
                <input onChange={updateQuestion5} name="question5string" id="question5string" type="text" placeholder={question5}></input>
                <br></br>
                <input onChange={updateQuestion6} name="question6string" id="question6string" type="text" placeholder={question6}></input>
                <br></br>
                <input onChange={updateQuestion7} name="question7string" id="question7string" type="text" placeholder={question7}></input>
                <br></br>
                <input onChange={updateQuestion8} name="question8string" id="question8string" type="text" placeholder={question8}></input>
                <br></br>
                <input onChange={updateQuestion9} name="question9string" id="question9string" type="text" placeholder={question9}></input>
                <br></br>
                <input onChange={updateQuestion10} name="question10string" id="question10string" type="text" placeholder={question10}></input>
                <br></br>
                <button>Create new event</button>
            </section>
        </div>
    );
}

export default EventCreate;