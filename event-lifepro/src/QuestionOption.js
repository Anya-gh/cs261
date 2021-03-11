import React from 'react';

const QuestionOption = ( {option, options, setOptions} ) => {

    const deleteHandler = () => {
        setOptions(options.filter(el => el.id !== option.id));
    }

    return (
        <div>
            <li style={{ listStyleType: "" }}>{option.description}
            <button onClick={deleteHandler}>-</button></li>
        </div>
    );
};

export default QuestionOption;