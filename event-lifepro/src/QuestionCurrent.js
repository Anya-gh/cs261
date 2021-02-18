import React, {useState} from "react";
import EventCustomise from "./EventCustomise";

import Head from "./Head";

import {Route, Link} from 'react-router-dom';

function QuestionCurrent(){
//Java script Logic

  return(
    //JSX aka HTML Code
    <div className="QuestionCurrent">
        {/* This is how to comment in JSX*/}
        <label for="Event Type">*Question*</label>
        <button>Edit</button>
        <label for="Event Type">*Question*</label>
        <button>Edit</button>
        <label for="Event Type">*Question*</label>
        <button>Edit</button>
        <label for="Event Type">*Question*</label>
        <button>Edit</button>
        <label for="Event Type">*Question*</label>
        <button>Edit</button>
    </div>
  );
}

export default QuestionCurrent;