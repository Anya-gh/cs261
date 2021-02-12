import React, {useState} from "react";
import './App.css';
import Home from './Home';
import EventCreate from './EventCreate';
import {Route, Link} from 'react-router-dom';

function App(){
//Java script Logic

  return(
    //JSX aka HTML Code
    <div className="app">
      <Route exact path="/" component={Home}/>
      <Route exact path="/EventCreate" component={EventCreate}/>
    </div>
  );
}

export default App;