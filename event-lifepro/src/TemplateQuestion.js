import React from 'react';

const TemplateQuestion = ( {question, questions, setQuestions} ) => {

    const deleteHandler = () => {
        setQuestions(questions.filter(el => el.id !== question.id));
    }

    return (
        <div>
            <li key={question.id} style={{ listStyleType: "" }}>{question.description}
            <button onClick={deleteHandler}>-</button></li>
        </div>
    );
};

export default TemplateQuestion;