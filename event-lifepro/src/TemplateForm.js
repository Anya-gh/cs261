import React, { useState } from 'react';
import uuid from 'react-uuid';
import Template from './Template';
import OptionsForm from './OptionsForm';
import OptionsList from './OptionsList';

const TemplateForm = ( {questions, setQuestions} ) => {

    const [newQuestion, setNewQuestion] = useState("");
    const [choice, setChoice] = useState(false);
    const [options, setOptions] = useState([]);

    const newQuestionHandler = e => {
        setNewQuestion(e.target.value);
    }

    const questionTypeHandler = e => {
        if (e.target.value === "choice") {
            setChoice(true);
        }
        else {
            setChoice(false);
        }
    }

    const submitQuestionHandler = e => {
        e.preventDefault();
        if (!choice) {
            setQuestions([
                ...questions, {description: newQuestion, type: "text", options: [], id: uuid()}
            ]);
        }
        else {
            if (newQuestion !== "") {
                let optionsArray = [];
                options.map(option => (
                    optionsArray.push(option.description)
                ))
                setQuestions([
                    ...questions, {description: newQuestion, type: "choice", options: optionsArray, id: uuid()}
                ])
            }
        }
        setNewQuestion("");
        setOptions([]);
    }
    return (
        <div>  
            <input style={{marginTop: "20px", padding: "5px"}} value={newQuestion || ""} onChange={newQuestionHandler} type="text" placeholder="Enter your question here"/>
            <select style={{padding: "5px"}} onChange={questionTypeHandler} name="questionType" id = "questionType" data-testid = "Qtype">
                <option value="text">Text</option>  
                <option value="choice">Choice</option>
            </select>
            <button style={{padding: "5px"}} onClick={submitQuestionHandler} type="submit">+</button>
            {choice
            ?
            <>
            <OptionsForm options={options} setOptions={setOptions}/> <OptionsList options={options} setOptions={setOptions}/>
            </>
            : ""}
        </div>
    )
};

export default TemplateForm;