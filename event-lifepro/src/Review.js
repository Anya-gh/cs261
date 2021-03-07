import { useState, useEffect } from 'react';
import React from 'react';
import QuestionResponse from './QuestionResponse';

function Review({ match }) {

    const [event, setEvent] = useState({});
    const [questionResponses, setQuestionResponses] = useState([]);
    const [users, setUsers] = useState([]);
    const [responses, setResponses] = useState([]);
    const [valid, setValid] = useState(false);
    const testData = [["Question 1", [["Annie's answer for question 1", "Annie"], ["Bob's answer for question 1", "Bob"]]], ["Question 2", [["Annie's answer for question 2", "Annie"]]]]

    useEffect(() => {
        /*getEvent();*/
    }, []);

    const getEvent = async () => {
        const eventResponse = await fetch(`http://localhost:3000/host/key/${match.params.id}`);
        const eventData = await eventResponse.json();
        setEvent((e) => {
            let newE = {...e}
            newE = eventData.keycheck.event
            return newE
          });
        setValid(eventData.exist);
        const userResponse = await fetch(`http://localhost:3000/host/reviewUser/${eventData.keycheck.event.eventID}`);
        const userData = await userResponse.json();
        setUsers(userData.user);
        const feedbackResponse = await fetch(`http://localhost:3000/host/review/${eventData.keycheck.event.eventID}`);
        const feedbackData = await feedbackResponse.json();
        setResponses(feedbackData.response);
        setQuestionResponses((e) => {
            var i;
            var j;
            var k;
            let newArray = [...e]
            for (i = 0; i < eventData.keycheck.event.templateObject.questionArray.length; i++) {
                newArray.push([eventData.keycheck.event.templateObject.questionArray[i], []]);
            }
            for (k = 0; k < feedbackData.response.length; k++) {
                let currentResponse = feedbackData.response[k].responseObject
                let currentUser = userData.user.find( (user) => {
                    return user.userID == feedbackData.response[k].userID;
                })
                for (j = 0; j < currentResponse.answers.length; j++) {
                    newArray[currentResponse.answers[j].questionID - 1][1].push([currentResponse.answers[j].content, currentUser.userObject.name]);
                }
            }
            console.log(newArray);
            return newArray;
        });
    };
    /*
        For testing purposes, I have created a test data array so you do not need to call the API/set up the database.
        Once you are finished testing, and everything works, please do not touch the other parts of the code and leave them commented out.
        Once the work is done I will remove the test data and uncomment the code.
    */

    return(
        console.log(testData),
        /*<div>
            {questionResponses.length > 0 && questionResponses.map(qR => (
                <QuestionResponse key={qR} question={qR[0].description} answers={qR[1]}/>
            ))}
        </div>*/
        <div>
            {testData.map(qR => (
                <QuestionResponse key={qR} question={qR[0]} answers={qR[1]}/>
            ))}
        </div>
    );
}

export default Review;