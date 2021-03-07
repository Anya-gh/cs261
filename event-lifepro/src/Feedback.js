import { useEffect, useState } from "react";
import React from 'react';
import QuestionAnswer from './QuestionAnswer';

function Feedback({match}) {

    const [event, setEvent] = useState([]);
    const [questionAnswers, setQuestionAnswers] = useState([]);

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

    return(
        <form onSubmit={handleSubmit}>
            {questionAnswers.length > 0 && questionAnswers.map(qA => (
                console.log(qA),
                <QuestionAnswer id={qA[0]} question={qA[1]} handler={updateAnswer}/>
            ))}
            <input type="submit" value="Submit"/>
        </form>
        
    );
}

export default Feedback;