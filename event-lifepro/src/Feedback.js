import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import React from 'react';
import QuestionAnswer from './QuestionAnswer';
import Head from "./Head";

function Feedback({match}) {

    const [event, setEvent] = useState("");
    const [questionAnswers, setQuestionAnswers] = useState([]);
    const [testData, setTestData] = useState([])
    const [anonymous, setAnonymous] = useState(false);
    const [mood, setMood] = useState(5);
    const [context, setContext] = useState("");
    const history = useHistory();

    useEffect(() => {
        getEvent();
        /*updateTestData();*/
    }, []);

    const updateTestData = () => {
        setTestData([[0, "Question 1", ""], [1, "Question 2", ""]]);
    }

    const updateAnswer = (index, answer) => {
        let newArray = questionAnswers
        newArray[index][2] = answer;
        setQuestionAnswers(newArray);
    }

    const updateAnswerTest = (index, answer) => {
        let newArray = testData
        newArray[index][2] = answer;
        setTestData(newArray);
    }

    const getEvent = async () => {
        const keyResponse = await fetch(`http://localhost:3000/attendee/key/${match.params.id}`);
        const keyData = await keyResponse.json();
        if (!keyData.exist) {
            history.push({pathname: '/', state: {foundAtt : "false"}})
        }
        else {
            setEvent(keyData.keycheck.eventID);
            const eventResponse = await fetch(`http://localhost:3000/attendee/feedback/${keyData.keycheck.eventID}`);
            const eventData = await eventResponse.json();
            /*setEvent(eventData.eventObject);*/
            var i;
            setQuestionAnswers((e) => {
                let newArray = [...e]
                for (i = 0; i < eventData.templateObject.questionArray.length; i++) {
                    newArray.push([i, eventData.templateObject.questionArray[i].description, ""]);
                }
                return newArray
            })
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const url = "http://localhost:3000/attendee/response";
        let answerArray = [];
        var i;
        for (i = 0; i < questionAnswers.length; i++) {
            answerArray[i] = questionAnswers[i][2];
        }
        const data = {
            name: match.params.name,
            anonymous: anonymous,
            eventID: event,
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

    const handleSubmit = async () => {
        /*const responsePost = await post();*/
        // get time from event as well
        // dont use time from first call, since time might have changed
    }

    /*
        For testing purposes, I have created a test data array so you do not need to call the API/set up the database.
        Once you are finished testing, and everything works, please do not touch the other parts of the code and leave them commented out.
        Once the work is done I will remove the test data and uncomment the code.
    */

    return(
        <form className="SubmitResponse" onSubmit={submitHandler}>
            <Head />
            <h1>Submitting as : {anonymous ? "Anonymous" : match.params.name}</h1>
            {questionAnswers.length > 0 && questionAnswers.map(qA => (
                console.log(qA),
                <QuestionAnswer id={qA[0]} question={qA[1]} handler={updateAnswer}/>
            ))}
            <br></br>
            {/*testData.map(qA => (
                <QuestionAnswer id={qA[0]} question={qA[1]} handler={updateAnswerTest}/>
            ))*/}
            <br></br>
            <div>
                Please describe your general mood regarding the event.
            </div>
            <div>Mood</div>
            <input onChange={updateMood} type="range" min="0" max="10"/>
            <br></br>
            <input onChange={updateContext} type="text" placeholder="Enter your context"/>
            <br></br>
            <input type="checkbox" id="anonymous" onClick={toggleAnonymous}/>
            <label for="anonymous">Toggle anonymity</label>
            <br></br>
            <input type="submit" value="Submit"/>
            <br></br>
        </form>
        
    );
}

export default Feedback;