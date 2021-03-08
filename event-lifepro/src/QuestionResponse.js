import { useState, useEffect } from 'react';
import React from 'react';

const QuestionResponse = ({question, answers}) => {

    const [toggle, setToggle] = useState(false);

    const toggleResponses = () => {
        setToggle(!toggle);
    };

    return(
        <div className="questions">
            <br></br>
            <button onClick={toggleResponses}>{question}</button>
            {toggle && answers.map((answer, index) => (
                <h2 key={index}>{answer[1]} : {answer[0]}</h2>
            ))}
            <br></br>
        </div>
    );
};

export default QuestionResponse;