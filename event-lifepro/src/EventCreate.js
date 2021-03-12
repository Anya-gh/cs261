import React, { useState, useEffect } from "react";

import Head from "./Head";
import TemplateForm from "./TemplateForm";
import TemplateQuestionList from "./TemplateQuestionList";
import Apidev from "./Apidev";

import { useHistory } from 'react-router-dom';


function EventCreate() {

    var defaultTemplate = 0;
    const [eventTitle, setEventTitle] = useState("");
    var eventType = "";
    const [interval, setInterval] = useState(0);
    const [people, setPeople] = useState(0);
    const [length, setLength] = useState(0);
    const [questions, setQuestions] = useState([]);
    const [valid, setValid] = useState(true);
    const history = useHistory();

    const updateEventTitle = e => {
        setEventTitle(e.target.value);
    };

    const updateInterval = e => {
        setInterval(e.target.value);
    };

    const updatePeople = e => {
        setPeople(e.target.value);
    }

    const updateLength = e => {
        setLength(e.target.value);
    };

    const updateEventType = e => {

    };

    const updateDefaultTemplate = e => {

    };

    const updateTemplate = e => {

    };

    useEffect(() => {
        if (questions.length == 0 || interval == 0 || length == 0 || eventTitle == "" || people == 0) {
            setValid(false);
        }
        else {
            setValid(true);
        }
    }, [questions, interval, length, eventTitle, people])
    
    const createEvent = async (e) => {
        console.log(valid);
        if (valid) {
            var i;
            const typeArray = [];
            const descriptionArray = [];
            for (i = 0; i < questions.length; i++) {
                descriptionArray.push([questions[i].description, questions[i].options]);
                typeArray.push(questions[i].type);
            }
            const url = "http://localhost:3000/host/createSession";
            const data = {
                eventName: eventTitle,
                people: people,
                interval: interval,
                length: length,
                time: Date.now(),
                typeArray: typeArray,
                descriptionArray: descriptionArray
            };
            const eventResponse = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
            const eventData = await eventResponse.json();
            console.log(eventData);
            history.push({pathname: `/review/${eventData.hostKey}`})
        }
    };

    return (
        //JSX aka HTML Code
        <div className="EventCreate">
            {/* This is how to comment in JSX*/}
            <Head />

            <h1 style={{ textAlign: "center", width: "100vw" }}>Create event</h1>
            <br></br>
            <div style={{ textAlign: "center", width: "80vw" }}>
                <fieldset>
                    <legend>Event information</legend>
                    <br></br>
                    <label htmlFor="Event Title">Enter title of the event: </label>
                    <input className="inputField" onChange={updateEventTitle} name="Event Title" id="Event Title" type="text" placeholder="Event Title"></input>
                    <br></br><br></br>
                    <label htmlFor="Length">Enter the length of the event: </label>
                    <input className="inputField" onChange={updateLength} name="Length" id="Length" type="number" placeholder="Length"></input>
                    <br></br><br></br>
                </fieldset>
            </div>
            <br></br>
            <section style={{ textAlign: "center", width: "80vw" }}>
                <fieldset>
                    <legend>Event settings</legend>
                    <br></br>
                    <label htmlFor="Event Type">Choose a type of event: </label>
                    <select className="inputField" onChange={updateEventType} name="Event Type" id="Event Type">
                        <option value="1">Session</option>
                        <option value="2">Series of sessions</option>
                        <option value="3">Project</option>
                    </select>
                    <br></br><br></br>
                    <label htmlFor="AnalysisFreqVal">Choose analysis frequency: </label>
                    <input className="inputField" onChange={updateInterval} placeholder="Frequency" name="AnalysisFreqVal" id="AnalysisFreqVal" type="number"></input>
                    <br></br><br></br>
                    <label htmlFor="People">Choose number of people attending: </label>
                    <input className="inputField" onChange={updatePeople} placeholder="People" name="People" id="People" type="number"></input>
                    <br></br><br></br>
                </fieldset>
            </section>
            <br></br>
            <section style={{ textAlign: "center", width: "80vw" }}>
                <fieldset>
                    <legend>Template settings</legend>
                    <br></br>
                    <label htmlFor="Template">Import a Template: </label>
                    <select onChange={updateDefaultTemplate} name="Template" id="Template">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    <br></br>
                    <button className="formButton" onClick={updateTemplate}>Import Template</button>
                    <br></br><br></br>

                    {/*Question section*/}

                    {/* Current Questions */}
                    <label>Current questions in template:</label>
                    <TemplateForm questions={questions} setQuestions={setQuestions}/>
                    <TemplateQuestionList questions={questions} setQuestions={setQuestions}/>
                    <br></br>
                    <button className="formButton" onClick={createEvent}>Create new event</button>
                </fieldset>
            </section>
            <br></br>
            <p>{!valid ? "All fields are required." : ""}</p>
        </div>
    );
}

export default EventCreate;