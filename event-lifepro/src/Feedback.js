import { useEffect, useState } from "react";
import React from 'react';
import QuestionAnswer from './QuestionAnswer';

function Feedback({match}) {

    const [event, setEvent] = useState([]);
    const [questionAnswers, setQuestionAnswers] = useState([]);
    const [testData, setTestData] = useState([])

    useEffect(() => {
        /*getEvent();*/
        updateTestData();
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
        const eventResponse = await fetch(`http://localhost:3000/attendee/feedback/${match.params.id}`);
        const eventData = await eventResponse.json();
        /*setEvent(eventData.eventObject);*/
        console.log(eventData.templateObject.questionArray);
        var i;
        setQuestionAnswers((e) => {
            let newArray = [...e]
            for (i = 0; i < eventData.templateObject.questionArray.length; i++) {
                newArray.push([i, eventData.templateObject.questionArray[i].description, ""]);
            }
            return newArray
        })
    };

    const handleSubmit = async () => {
        /*const responsePost = await post();*/
    }

    /*
        For testing purposes, I have created a test data array so you do not need to call the API/set up the database.
        Once you are finished testing, and everything works, please do not touch the other parts of the code and leave them commented out.
        Once the work is done I will remove the test data and uncomment the code.
    */

    return(
        <form onSubmit={handleSubmit}>
            {/*questionAnswers.length > 0 && questionAnswers.map(qA => (
                console.log(qA),
                <QuestionAnswer id={qA[0]} question={qA[1]} handler={updateAnswer}/>
            ))*/}
            {testData.map(qA => (
                <QuestionAnswer id={qA[0]} question={qA[1]} handler={updateAnswerTest}/>
            ))
            }
            <input type="submit" value="Submit"/>
        </form>
        
    );
}

export default Feedback;