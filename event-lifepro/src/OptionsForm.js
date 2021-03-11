import React, { useState } from 'react';
import uuid from 'react-uuid';

const OptionsForm = ( {options, setOptions} ) => {
    const [newOption, setNewOption] = useState("");

    const newOptionHandler = e => {
        setNewOption(e.target.value);
    }

    const submitOptionHandler = e => {
        e.preventDefault();
        setOptions([
            ...options, {description: newOption, id: uuid()}
        ])
        setNewOption("");
    }

    return (
        <div>
            <input value={newOption || ""} onChange={newOptionHandler} type="text" placeholder="Enter your option here"/>
            <button onClick={submitOptionHandler} type="submit">+</button>
        </div>
    )
}

export default OptionsForm