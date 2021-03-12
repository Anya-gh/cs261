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
            <h2 style={{margin: "10px"}}>{question.description}</h2>
            <input className="inputField" onChange={answerHandler} type="text" placeholder="Enter answer here"></input>
            <br></br>
            </>
            :
            <>
            <h2 style={{margin: "10px"}}>{question.description[0]}</h2>
                {question.description[1].map((option, index) => (
                    <div key={index}>
                        {option}
                        <input style={{margin: "5px"}} type="radio" onChange={answerHandler} id={index} name={"option" + id} value={index}/>
                        <br></br>
                    </div>
                ))}
            </>
            }
        </div>
    );
};

export default QuestionAnswers;