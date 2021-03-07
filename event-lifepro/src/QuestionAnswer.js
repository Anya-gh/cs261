import { useEffect, useState } from "react";
import React from 'react';

const QuestionAnswers = ({id, question, handler}) => {

    const answerHandler = e => {
        handler(id, e.target.value);
    }

    return(
        <div>
            <h2 key={id}>{question}</h2>
            <input onChange={answerHandler} type="text" placeholder="Enter answer here"></input>
        </div>
    );
};

export default QuestionAnswers;