import React, {useState} from "react";
import EventCustomise from "./EventCustomise";

import Head from "./Head";

import {Route, Link} from 'react-router-dom';

function QuestionAdder(){
//Java script Logic

  return(
    //JSX aka HTML Code
    <div className="QuestionAdder">
        {/* This is how to comment in JSX*/}
        <label for="Response Type">Question: </label>
        <input type="text"></input>
        <label for="Response Type">Response type for the question: </label>
        <select name="Response Type" id="Response Type">
              <option value="1">Text</option>
              <option value="2">Select</option>
              <option value="3">Date</option>
              <option value="4">Email</option>
              <option value="3">Number</option>
        </select>
        <button>Add Question</button>
        <button><Link to="/EventCreate">Update Template</Link></button>
    </div>
  );
}

export default QuestionAdder;