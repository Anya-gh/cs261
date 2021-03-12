import React from 'react';

const TemplateQuestion = ( {question, questions, setQuestions} ) => {

    const deleteHandler = () => {
        setQuestions(questions.filter(el => el.id !== question.id));
    }

    return (
        <div style={{margin: "10px"}}>
            <li key={question.id} style={{listStyleType: "", display:"flex", flexDirection:"row", justifyContent:"center"}}><p style={{marginRight:"5px"}}>{question.description}</p>
            <button style={{paddingLeft:"5px", paddingRight:"5px", paddingTop:"0px", paddingBottom:"0px", height: "20px", textAlign: "center"}} onClick={deleteHandler}>-</button></li>
        </div>
    );
};

export default TemplateQuestion;