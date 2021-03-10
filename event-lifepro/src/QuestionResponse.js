import { useState, useEffect } from 'react';
import React from 'react';

const QuestionResponse = ({question, answers}) => {

    const [toggle, setToggle] = useState(false);

    const toggleResponses = () => {
        setToggle(!toggle);
    };

    let date;

    return(
        <div className="questions">
            <br></br>
            <button onClick={toggleResponses}>{question}</button>
            {toggle && answers.map((answer, index) => (
                date = new Date(answer[2]),
                <h2 key={index}>{answer[1]} : {answer[0]} : {date.getHours()}:{date.getMinutes()}</h2>
            ))}
            <br></br>
        </div>
    );
};

export default QuestionResponse;