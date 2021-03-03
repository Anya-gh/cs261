import React, {useState} from "react";
import {Link} from 'react-router-dom';

import Head from "./Head";

function Home(){

  const [attKey, setAttKey] = useState("");
  const [hostKey, setHostKey] = useState("");

  const updateAttKey = e => {
    setAttKey(e.target.value);
  };

  const updateHostKey = e => {
    setHostKey(e.target.value);
  };

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
        <button>
          <Link to ={`/Review/${hostKey}`} data-testid="HostLogin">Login</Link>
        </button>
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
        <input type="text" placeholder="Enter your name here" data-testid="AttendeeNameInput"></input>
        {/*name not being sent currently*/}
        <button>
          <Link to ={`/Feedback/${attKey}`} data-testid="AttendeeLogin">Login</Link>
        </button>
      </div>
    </div>
  );
}

export default Home;