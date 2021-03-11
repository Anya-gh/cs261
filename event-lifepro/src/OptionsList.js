import React from 'react';
import QuestionOption from "./QuestionOption";

const OptionsList = ( {options, setOptions} ) => {
    return (
        <div>
            <ul style={{ listStyleType: "none" }}>
                {options.map((option) => (
                    <QuestionOption key={option.id} option={option} options={options} setOptions={setOptions}/>
                ))}
            </ul>
        </div>
    )
}

export default OptionsList;