import React from 'react';
import uuid from 'react-uuid';
import Template from './Template';

const TemplateForm = ( {questions, setQuestions, newQuestion, setNewQuestion} ) => {
    const newQuestionHandler = e => {
        setNewQuestion(e.target.value);
    }

    const submitQuestionHandler = e => {
        e.preventDefault();
        setQuestions([
            ...questions, {description: newQuestion, id: uuid()}
        ]);
        setNewQuestion("");
    }
    return (
        <div>  
            <input value={newQuestion} onChange={newQuestionHandler} type="text" placeholder="Enter your question here"/>
            <button onClick={submitQuestionHandler} type="submit">+</button>
        </div>
    )
};

export default TemplateForm;