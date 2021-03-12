import React, {useEffect, useState} from "react";
import {Link, useHistory} from 'react-router-dom';

import Head from "./Head";

function Home(){

  const [attKey, setAttKey] = useState("");
  const [hostKey, setHostKey] = useState("");
  const [validHost, setValidHost] = useState("");
  const [validAtt, setValidAtt] = useState("");
  const [name, setName] = useState("");
  const history = useHistory();

  const checkValid = async (key, type) => {
    console.log(`http://localhost:3000/${type}/key/${key}`);
    const keyResponse = await fetch(`http://localhost:3000/${type}/key/${key}`);
    const keyData = await keyResponse.json();
    if (type === "host") {
      setValidHost(keyData);
    }
    else {
      setValidAtt(keyData);
    }
    if (keyData === "") {
      if (type === "host") {
        history.push({pathname: `/review/${key}`});
      }
      else {
        history.push({pathname: `/feedback/${key}/${name}`});
      }
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

      <div className="homeAccess">
        <h2 className="accessTitle">Host access</h2>
        <h3>Access an event as host:</h3>
        <input className="inputField" onChange={updateHostKey} type="text" placeholder="Enter key here" data-testid="HostKeyInput"></input>
        <button className="homeButton" onClick={() => checkValid(hostKey, "host")} data-testid="HostLogin">
          {/*valid ? <Link to ={`/Review/${hostKey}`} data-testid="HostLogin">Login</Link> : <div>Login</div>*/}
          Login
        </button>
        {validHost}
        <h3>OR</h3>
            <Link className="homeLink" to="/EventCreate"><button className="homeButton">Create new event</button></Link>
      </div>

      {/*Attendee access section*/}

      <div className="homeAccess">
        <h2 className="accessTitle">Attendee access</h2>
        <h3>Access an event as attendee:</h3>
        <input className="inputField"onChange={updateAttKey} type="text" placeholder="Enter key here" data-testid="AttendeeKeyInput"></input>
        <input className="inputField" onChange={updateName} type="text" placeholder="Enter your name here" data-testid="AttendeeNameInput"></input>
        {/*name not being sent currently*/}
        <button className="homeButton" onClick={() => checkValid(attKey, "attendee")} data-testid="AttendeeLogin">
          Login
        </button>
        <p>{validAtt}</p>
      </div>
    </div>
  );
}

export default Home;