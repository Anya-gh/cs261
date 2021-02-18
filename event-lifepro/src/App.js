import React, {useState} from "react";
import './App.css';
import Home from './Home';
import EventCreate from './EventCreate';
import TemplateEditor from './TemplateEditor';
import {Route, Link} from 'react-router-dom';

function App(){
//Java script Logic

  return(
    //JSX aka HTML Code
    <div className="app">
      <Route exact path="/" component={Home}/>
      <Route exact path="/EventCreate" component={EventCreate}/>
      <Route exact path="/TemplateEditor" component={TemplateEditor}/>
    </div>
  );
}

export default App;