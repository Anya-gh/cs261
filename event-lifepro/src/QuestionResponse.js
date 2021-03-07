import { useState, useEffect } from 'react';
import React from 'react';

const QuestionResponse = ({question, answers}) => {
    return(
        <div>
            <h1>{question}</h1>
            {answers.map((answer, index) => (
                <h2 key={index}>{answer[1]} : {answer[0]}</h2>   
            ))}
        </div>
    );
};

export default QuestionResponse;