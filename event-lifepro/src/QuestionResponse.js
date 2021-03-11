import { useState, useEffect } from 'react';
import BarChart from './BarChart';
import React from 'react';

const QuestionResponse = ({question, answers, type}) => {

    const [toggle, setToggle] = useState(false);
    const [chartToggle, setChartToggle] = useState(false);
    const [choices, setChoices] = useState([]);
    const [selections, setSelections] = useState([]);

    useEffect(() => {
        updateChoices();
    }, [question, answers])

    const updateChoices = () => {
        var i;
        var newChoicesArray = [];
        var newSelectionsArray = [];
        for (i = 0; i < question[1].length; i++) {
            newChoicesArray.push(question[1][i]);
            newSelectionsArray.push(0)
        }
        var j;
        if (answers.length > 0) {
            for (j = 0; j < answers.length; j++) {
                newSelectionsArray[answers[j][0]] += 1;
            }
        }
        setSelections(newSelectionsArray);
        setChoices(newChoicesArray);
    }

    const toggleResponses = () => {
        setToggle(!toggle);
    };

    const toggleChart = () => {
        setChartToggle(!chartToggle);
    }

    let date;

    return(
        <div className="questions">
            <br></br>
            <h2>{question[0]}</h2>
            <br></br>
            <button onClick={toggleResponses}>View responses</button>
            { 
            type === "text" ?
            toggle && answers.map((answer, index) => (
                date = new Date(answer[2]),
                <h3 key={index}>{answer[1]} : {answer[0]} : {date.getHours()}:{date.getMinutes()}</h3>
            ))
            : type === "choice" ?
            <div>
                <button  onClick={toggleChart}>View graph</button>
                {toggle && answers.map((answer, index) => (
                    date = new Date(answer[2]),
                    <h3 key={index}>{answer[1]} : {question[1][answer[0]]} : {date.getHours()}:{date.getMinutes()}</h3>
                ))}
                {chartToggle && <BarChart labels={choices} label="Selections" data={selections}/>}
            </div>
            : ""}
            <br></br>
        </div>
    );
};

export default QuestionResponse;