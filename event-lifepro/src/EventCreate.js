import React, { useState } from "react";

import Head from "./Head";
import TemplateForm from "./TemplateForm";
import TemplateQuestionList from "./TemplateQuestionList";
import Apidev from "./Apidev";

import { Route, Link } from 'react-router-dom';


function EventCreate() {
    //Java script Logic


    // Need to set the ID of the meeting here
    // This is a placeholder
    const [id, setId] = useState("0");
    const [eventTitle, setEventTitle] = useState("");
    const [hostName, setHostName] = useState([]);
    const [startTime, setStartTime] = useState("00:00:00");
    const [endTime, setEndTime] = useState("00:00:00");
    const [eventType, setEventType] = useState(0);
    const [freqVal, setFreqVal] = useState("00:00:00");
    const [people, setPeople] = useState(0);
    const [questions, setQuestions] = useState([]);
    const [newQuestion, setNewQuestion] = useState("");
    const [length, setLength] = useState("00:00:00");

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

    const updatePeople = e => {
        setPeople(e.target.value);
    }

    const updateId = e => {
        setId(e.target.value);
    };

    const updateLength = e => {
        setLength(endTime - startTime);
    };

    const updateTemplate = e => {

    };

    const createEvent = e => {
        updateLength();
        /*var descriptionArray=new Array(question1,question2,question3,question4,question5,question6,question7,question8,question9,question10);
        var empty = new Array();
        Apidev.createNewSession(eventTitle, people, freqVal, length, startTime, empty, descriptionArray)
        */
    };

    return (
        //JSX aka HTML Code
        <div className="EventCreate">
            {/* This is how to comment in JSX*/}
            <Head />

            <h1 style={{ textAlign: "center", width: "100vw" }}>Create event</h1>
            <br></br>
            <section style={{ textAlign: "center", width: "80vw" }}>
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
            <br></br>
            <section style={{ textAlign: "center", width: "80vw" }}>
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
                    <input onChange={updateFreqVal} name="AnalysisFreqVal" id="AnalysisFreqVal" type="time"></input>
                    <br></br>
                    <label htmlFor="People">Choose number of people attending: </label>
                    <input onChange={updatePeople} name="People" id="People" type="number"></input>
                    <br></br><br></br>
                </fieldset>
            </section>
            <br></br>
            <section style={{ textAlign: "center", width: "80vw" }}>
                <fieldset>
                    <legend>Template settings</legend>
                    <br></br>
                    <label htmlFor="Template">Import a Template: </label>
                    <select onChange={updateId} name="Template" id="Template">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    <br></br>
                    <button onClick={updateTemplate}>Import Template</button>
                    <br></br><br></br>

                    {/*Question section*/}

                    {/* Current Questions */}
                    <label>Current questions in template:</label>
                    <TemplateForm questions={questions} setQuestions={setQuestions} newQuestion={newQuestion} setNewQuestion={setNewQuestion}/>
                    <TemplateQuestionList questions={questions} setQuestions={setQuestions}/>
                    <button onClick={createEvent}>Create new event</button>
                </fieldset>
            </section>
        </div>
    );
}

export default EventCreate;