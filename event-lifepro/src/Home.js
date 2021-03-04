import React, {useEffect, useState} from "react";
import {Link, useHistory} from 'react-router-dom';

import Head from "./Head";

function Home(){

  const [attKey, setAttKey] = useState("");
  const [hostKey, setHostKey] = useState("");
  const [validHost, setValidHost] = useState(true);
  const [validAtt, setValidAtt] = useState(true);
  const [name, setName] = useState("");
  const history = useHistory();

  const checkValid = (key, type) => {
    console.log(key)
    var initial = key.substring(0, 1);
    if ((initial == "h") && (type == "host")) {
      history.push(`/Review/${hostKey}`)
    }
    else if ((initial != "h") && (type == "host")) {
      setValidHost(false);
    }
    else if ((initial == "a") && (type == "att") && (name != "")) {
      history.push(`/Feedback/${attKey}/${name}`)
    }
    else if (((initial != "a") || (name == "")) && (type == "att")) {
      setValidAtt(false);
    }
  }

  const updateAttKey = e => {
    setAttKey(e.target.value);
  };

  const updateHostKey = e => {
    setHostKey(e.target.value);
  };

  const updateName = e => {
    setName(e.target.value);
  }

  return(
    //JSX aka HTML Code
    //Moved all of HostAccess.js and AttendeeAccess.js here for convenience (url params)
    //The components only contained DOM content anyway, so it makes no difference
    <div className="Home">
      {/* This is how to comment in JSX*/}
      <header><Head /></header>
      
      {/*Host access section*/}

      <div className="Hostacc">
        <h2>Host access</h2>
        <h3>Access an event as host:</h3>
        <input onChange={updateHostKey} type="text" placeholder="Enter key here" data-testid="HostKeyInput"></input>
        <button onClick={() => checkValid(hostKey, "host")}>
          {/*valid ? <Link to ={`/Review/${hostKey}`} data-testid="HostLogin">Login</Link> : <div>Login</div>*/}
          Login
        </button>
        {!validHost ? <div>Please try again.</div> : <div></div>}
        <h3>OR</h3>
        <button>
            <Link to="/EventCreate">Create new event</Link>
        </button>
      </div>

      {/*Attendee access section*/}

      <div className="Attendacc">
        <h2>Attendee access</h2>
        <h3>Access an event as attendee:</h3>
        <input onChange={updateAttKey} type="text" placeholder="Enter key here" data-testid="AttendeeKeyInput"></input>
        <input onChange={updateName} type="text" placeholder="Enter your name here" data-testid="AttendeeNameInput"></input>
        {/*name not being sent currently*/}
        <button onClick={() => checkValid(attKey, "att")}>
          Login
        </button>
        {!validAtt ? <div>Please try again.</div> : <div></div>}
      </div>
    </div>
  );
}

export default Home;