import { useEffect, useState } from "react";
import uuid from 'react-uuid';
import React from 'react';

const QuestionAnswers = ({id, question, handler}) => {

    const answerHandler = e => {
        handler(id, e.target.value);
    }

    return(
        <div style={{ textAlign: "center", width: "80vw" }}>
            {question.type === "text" ?
            <>
            <h2>{question.description}</h2>
            <br></br>
            <input onChange={answerHandler} type="text" placeholder="Enter answer here"></input>
            <br></br>
            </>
            :
            <>
            <h2>{question.description[0]}</h2>
            <br></br>
            <React.Fragment>
                {question.description[1].map((option, index) => (
                    <label>
                        {option}
                        <input type="radio" onChange={answerHandler} id={index} name="option" value={index}/>
                        <br></br>
                    </label>
                ))}
            </React.Fragment>
            </>
            }
        </div>
    );
};

export default QuestionAnswers;