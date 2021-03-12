import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import React from 'react';
import QuestionAnswer from './QuestionAnswer';
import Head from "./Head";
import uuid from 'react-uuid';

function Feedback({match}) {

    const [event, setEvent] = useState("");
    const [eventID, setEventID] = useState(0)
    const [questionAnswers, setQuestionAnswers] = useState([]);
    const [anonymous, setAnonymous] = useState(false);
    const [mood, setMood] = useState(5);
    const [context, setContext] = useState("");
    const [submit, setSubmit] = useState(false);
    const [answerError, setAnswerError] = useState(false);
    const history = useHistory();

    useEffect(() => {
        getEvent();
    }, []);

    const updateAnswer = (index, answer) => {
        let newArray = questionAnswers
        newArray[index][2] = answer;
        setQuestionAnswers(newArray);
    }

    const getEvent = async () => {
        const eventResponse = await fetch(`http://localhost:3000/attendee/feedback/${match.params.id}`);
        const eventData = await eventResponse.json();
        setEvent(eventData.eventObject);
        setEventID(eventData.eventID);
        console.log(eventData);
        var i;
        setQuestionAnswers((e) => {
            let newArray = [...e]
            for (i = 0; i < eventData.templateObject.questionArray.length; i++) {
                newArray.push([i, eventData.templateObject.questionArray[i], ""]);
            }
            return newArray
        })
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const url = "http://localhost:3000/attendee/response";
        let answerArray = [];
        var i;
        var notEmpty;
        for (i = 0; i < questionAnswers.length; i++) {
            answerArray[i] = questionAnswers[i][2];
            notEmpty = answerArray[i]
        }
        if (notEmpty) {
            const data = {
                name: match.params.name,
                anonymous: anonymous,
                eventID: eventID,
                answerArray: answerArray,
                context: context,
                mood: mood
            }
            await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
            .then(response => response.json())
            .catch((error) => {
                console.log("Error: ", error);
            });
            setSubmit(true);
            setAnswerError(false);
        }
        else {
            setAnswerError(true);
        }
    }

    const toggleAnonymous = e => {
        setAnonymous(!anonymous);
    }

    const updateMood = e => {
        setMood(e.target.value);
    }

    const updateContext = e => {
        setContext(e.target.value);
    }

    return(
        <form className="SubmitResponse" onSubmit={submitHandler}>
            <Head />
            <h1 style={{margin: "30px"}}>{event.eventname}</h1>
            <h2 style={{margin: "10px", fontStyle:"italic", color:"grey"}} key="name">Submitting as : {anonymous ? "Anonymous" : match.params.name}</h2>
            {questionAnswers.length > 0 && questionAnswers.map((qA, index) => (
                <QuestionAnswer key={index} id={qA[0]} question={qA[1]} handler={updateAnswer}/>
            ))}
            <br></br>
            <div>
                Please describe your general mood regarding the event.
            </div>
            <br></br>
            <h3 style={{margin: "5px"}}>Mood</h3>
            <input style={{margin: "10px"}} onChange={updateMood} type="range" min="0" max="10"/>
            <br></br>
            <h3 style={{margin: "5px"}}>Context</h3>
            <input className="inputField" onChange={updateContext} type="text" placeholder="Enter your context"/>
            <br></br>
            <label>
                Toggle anonymity
                <input style={{margin: "5px"}} type="checkbox" id="anonymous" onClick={toggleAnonymous}/>
            </label>
            <br></br>
            <input className="formButton" type="submit" value="Submit"/>
            <br></br>
            {submit ?
            <div style={{display: "flex", flexDirection:"column", justifyContent:"center"}}>
            <p style={{margin:"10px", textAlign:"center"}}>Thank you for your submission!</p>
            <p style={{margin:"10px", textAlign:"center"}}>You may submit again to update your feedback.</p>
            </div> 
            : answerError ?
            <p>You must submit at least one answer. Please try again.</p>
            : ""}

        </form>
        
    );
}

export default Feedback;