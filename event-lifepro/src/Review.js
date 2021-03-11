import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import Head from "./Head";
import React from 'react';
import QuestionResponse from './QuestionResponse';
import LineChart from './LineChart';
import BarChart from './BarChart';

function Review({ match }) {

    const [event, setEvent] = useState({});
    const [attKey, setAttKey] = useState("");
    const [moodSet, setPastMoodSet] = useState([]);
    const [intervals, setIntervals] = useState([]);
    const [mood, setMood] = useState(0);
    const [questionResponses, setQuestionResponses] = useState([]);
    const [contexts, setContexts] = useState([]);
    const history = useHistory();

    useEffect(() => {
        getEvent();
    }, []);

    const updatePastMoods = (pastMoods, interval) => {
        var i;
        var intervals = [];
        for (i = 0; i < pastMoods.length; i++) {
            var element = (i * interval) + " minutes";
            intervals.push(element);
        }
        setIntervals(intervals);
        setPastMoodSet(pastMoods);
    }

    const getEvent = async () => {
        const feedbackResponse = await fetch(`http://localhost:3000/host/review/${match.params.id}`);
        const feedbackData = await feedbackResponse.json();
        setEvent((e) => {
            let newE = { ...e };
            newE = feedbackData.eventObject;
            setAttKey(feedbackData.attKey);
            return newE;
        });
        updatePastMoods(feedbackData.analysisObject.moodArray, feedbackData.eventObject.interval);
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
                setContexts([...contexts, [currentResponse.context, currentResponse.name, currentResponse.time]]);
                for (j = 0; j < currentResponse.answers.length; j++) {
                    newArray[currentResponse.answers[j].questionID][1].push([currentResponse.answers[j].content, currentResponse.name, currentResponse.time]);
                }
            }
            return newArray;
        });
    };

    return (
        <div className="Review" >
            <Head />
            <h3>Host key: {match.params.id}</h3>
            <br></br>
            <h3>Attendee key: {attKey}</h3>
            <section style={{ textAlign: "center", width: "80vw" }}>
                <br></br>
                <label htmlFor="Average mood"><b>Average mood: {mood}</b></label>
                <br></br>
                <label htmlFor="Questions"><u>Questions:</u></label>
                <br></br>
                <br></br>
            {questionResponses.length > 0 && questionResponses.map((qR, index) => (
                <QuestionResponse key={index} question={qR[0].description} type={qR[0].type} answers={qR[1]}/>
            ))}
            <QuestionResponse key="context" question={["Context", []]} type="text" answers={contexts}/>
            <br></br>
            {moodSet.length > 0 ?
            <LineChart labels={intervals} label="Mood" data={moodSet} />
            : "" }
            </section>
        </div>
    );
}

export default Review;