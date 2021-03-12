import React from 'react';

const QuestionOption = ( {option, options, setOptions} ) => {

    const deleteHandler = () => {
        setOptions(options.filter(el => el.id !== option.id));
    }

    return (
        <div style={{margin:"10px"}}>
            <li style={{listStyleType: "", display:"flex", flexDirection:"row", justifyContent:"center"}}><p style={{marginRight:"5px", color:"darkgray", fontStyle:"italic"}}>{option.description}</p>
            <button style={{paddingLeft:"5px", paddingRight:"5px", paddingTop:"0px", paddingBottom:"0px", height: "20px", textAlign: "center"}} onClick={deleteHandler}>-</button></li>
        </div>
    );
};

export default QuestionOption;