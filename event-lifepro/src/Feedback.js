import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import React from 'react';
import QuestionAnswer from './QuestionAnswer';
import Head from "./Head";

function Feedback({match}) {

    const [event, setEvent] = useState([]);
    const [questionAnswers, setQuestionAnswers] = useState([]);
    const [testData, setTestData] = useState([])
    const [anonymous, setAnonymous] = useState(false);
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

    const toggleAnonymous = e => {
        e.preventDefault();
        setAnonymous(!anonymous);
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
        <form className="SubmitResponse" onSubmit={handleSubmit}>
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
            <button onClick={toggleAnonymous}>Submit anonymously</button>
            <br></br>
            <input type="submit" value="Submit"/>
            <br></br>
        </form>
        
    );
}

export default Feedback;