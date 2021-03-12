import React, { useState } from 'react';
import uuid from 'react-uuid';

const OptionsForm = ( {options, setOptions} ) => {
    const [newOption, setNewOption] = useState("");

    const newOptionHandler = e => {
        setNewOption(e.target.value);
    }

    const submitOptionHandler = e => {
        e.preventDefault();
        if (newOption !== "") {
            setOptions([
                ...options, {description: newOption, id: uuid()}
            ])
            setNewOption("");
        }
    }

    return (
        <div>
            <input style={{marginTop: "20px", padding: "5px"}} value={newOption || ""} onChange={newOptionHandler} type="text" placeholder="Enter your option here"/>
            <button style={{padding: "5px"}} onClick={submitOptionHandler} type="submit">+</button>
        </div>
    )
}

export default OptionsForm