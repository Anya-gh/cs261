import React from 'react';
import TemplateQuestion from "./TemplateQuestion";
import uuid from 'react-uuid';

const TemplateQuestionList = ( {questions, setQuestions} ) => {
    return (
        <div>
            <ul style={{ listStyleType: "none" }}>
                {questions.map(question => (
                    <TemplateQuestion key={question.id} question={question} questions={questions} setQuestions={setQuestions}/>
                ))}
            </ul>
        </div>
    );
};

export default TemplateQuestionList;