import React, {useState} from "react";
import EventCustomise from "./EventCustomise";

import Head from "./Head";

import {Route, Link} from 'react-router-dom';

function QuestionEditor(){
//Java script Logic

  return(
    //JSX aka HTML Code
    <div className="QuestionEditor">
        {/* This is how to comment in JSX*/}
        <label htmlFor="Response Type">*Question*</label>
        <label htmlFor="Response Type">New Question: </label>
        <input type="text"></input>
        <label htmlFor="Response Type">Response type for the new question: </label>
        <select name="Response Type" id="Response Type">
              <option value="1">Text</option>
              <option value="2">Select</option>
              <option value="3">Date</option>
              <option value="4">Email</option>
              <option value="3">Number</option>
        </select>
        <button>Update</button>
    </div>
  );
}

export default QuestionEditor;