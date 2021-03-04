import React, {useState} from "react";

import Head from "./Head";
import QuestionAdder from './QuestionAdder';
import QuestionCurrent from './QuestionCurrent';
import QuestionEditor from './QuestionEditor';

function TemplateEditor(){
//Java script Logic

  return(
    //JSX aka HTML Code
    <div className="TemplateEditor">
      {/* This is how to comment in JSX*/}
      <header><Head /></header>
      
      {/*Question section*/}

      <QuestionAdder />

      <QuestionCurrent />

      <QuestionEditor />
    </div>
  );
}

export default TemplateEditor;