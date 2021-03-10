import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import Head from "./Head";
import React from 'react';
import QuestionResponse from './QuestionResponse';

function Review({ match }) {

    const [event, setEvent] = useState({});
    const [mood, setMood] = useState(0);
    const [questionResponses, setQuestionResponses] = useState([]);
    const history = useHistory();
    const testData = [["Question 1", [["Annie's answer for question 1", "Annie"], ["Bob's answer for question 1", "Bob"]]], ["Question 2", [["Annie's answer for question 2", "Annie"]]]]

    useEffect(() => {
        getEvent();
    }, []);

    const getEvent = async () => {
        const keyResponse = await fetch(`http://localhost:3000/host/key/${match.params.id}`);
        const keyData = await keyResponse.json();
        console.log(keyData);
        if (!keyData.exist) {
            history.push({ pathname: '/', state: { foundHost: "false" } })
        }
        else {
            const feedbackResponse = await fetch(`http://localhost:3000/host/review/${keyData.keycheck.eventID}`);
            const feedbackData = await feedbackResponse.json();
            setEvent((e) => {
                let newE = { ...e }
                newE = feedbackData.eventObject
                return newE
            });
            setMood(feedbackData.analysisObject.currentMood);
            setQuestionResponses((e) => {
                var i;
                var j;
                var k;
                let newArray = [...e]
                for (i = 0; i < feedbackData.templateObject.questionArray.length; i++) {
                    newArray.push([feedbackData.templateObject.questionArray[i], []]);
                }
                for (k = 0; k < feedbackData.response.length; k++) {
                    let currentResponse = feedbackData.response[k].responseObject
                    for (j = 0; j < currentResponse.answers.length; j++) {
                        newArray[currentResponse.answers[j].questionID][1].push([currentResponse.answers[j].content, currentResponse.name, currentResponse.time]);
                    }
                }
                console.log(newArray);
                return newArray;
            });
        }
    };
    /*
        For testing purposes, I have created a test data array so you do not need to call the API/set up the database.
        Once you are finished testing, and everything works, please do not touch the other parts of the code and leave them commented out.
        Once the work is done I will remove the test data and uncomment the code.
    */

    return (
        <div className="Review" >
            <Head />
            <section style={{ textAlign: "center", width: "80vw" }}>
                <br></br>
                <label htmlFor="Average mood"><b>Average mood: {mood}</b></label>
                <br></br>
                <label htmlFor="Question instruction"><b>Press on Question to view responses</b></label>
                <br></br>
                <br></br>
                <label htmlFor="Questions"><u>Questions:</u></label>
                <br></br>
                <br></br>
            {questionResponses.length > 0 && questionResponses.map(qR => (
                <QuestionResponse key={qR} question={qR[0].description} answers={qR[1]}/>
            ))}
            </section>
        </div>

        /*<div className="Review" >
            <Head />
            <section style={{ textAlign: "center", width: "80vw" }}>
                <br></br>
                <label htmlFor="Question instruction"><b>Press on Question to view responses</b></label>
                <br></br>
                <br></br>
                <label htmlFor="Questions"><u>Questions:</u></label>
                <br></br>
                <br></br>
                {testData.map(qR => (               
                    <QuestionResponse key={qR} question={qR[0]} answers={qR[1]} />
                    
                ))}
            </section>
        </div>*/
    );
}

export default Review;