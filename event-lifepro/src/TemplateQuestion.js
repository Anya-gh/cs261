import React from 'react';

const TemplateQuestion = ( {question, questions, setQuestions} ) => {

    const deleteHandler = () => {
        setQuestions(questions.filter(el => el.id !== question.id));
    }

    return (
        <div>
            <li>{question.description}</li>
            <button onClick={deleteHandler}>-</button>
        </div>
    );
};

export default TemplateQuestion;