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
            <button className="formButton" onClick={toggleResponses}>View responses</button>
            { 
            type === "text" ?
            toggle && answers.map((answer, index) => (
                date = new Date(answer[2]),
                <div key={index} style={{margin: "10px"}}>
                    <h3 style={{margin: "10px"}}>{answer[1]}, {date.getHours()}:{date.getMinutes()}</h3>
                    <p>{answer[0]}</p>
                </div>
            ))
            : type === "choice" ?
            <div>
                <button className="formButton" onClick={toggleChart}>View graph</button>
                {toggle && (answers.length > 0 ? answers.map((answer, index) => (
                    date = new Date(answer[2]),
                    <div key={index}>
                        <h3 style={{margin: "10px"}}>{answer[1]}, {date.getHours()}:{date.getMinutes()}</h3>
                        <p>({Number(answer[0]) + 1}) {question[1][answer[0]]}</p>
                    </div>
                )) : "No responses recieved yet.")}
                {console.log("choices", choices)}
                {console.log("selections", selections)}
                {chartToggle && <BarChart labels={choices} label="Selections" data={selections}/>}
            </div>
            : ""}
            <br></br>
        </div>
    );
};

export default QuestionResponse;