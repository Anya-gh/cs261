import React, {useState} from "react";
import './App.css';
import Home from './Home';
import EventCreate from './EventCreate';
import Feedback from './Feedback';
import Review from './Review';
import {Route, Link, Switch} from 'react-router-dom';

function App(){
//Java script Logic

  return(
    //JSX aka HTML Code
    <div className="app">
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/EventCreate" component={EventCreate}/>
        <Route exact path="/Review/:id" component={Review}/>
        <Route exact path="/Feedback/:id/:name" component={Feedback}/>
      </Switch>
    </div>
  );
}

export default App;