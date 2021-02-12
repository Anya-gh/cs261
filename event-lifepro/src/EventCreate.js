import React, {useState} from "react";
import EventCustomise from "./EventCustomise";

import Head from "./Head";

import {Route, Link} from 'react-router-dom';

function EventCreate(){
//Java script Logic

  return(
    //JSX aka HTML Code
    <div className="EventCreate">
        {/* This is how to comment in JSX*/}
        <Head compname="Event LiFePro" slogan="The live feedback provider"/>

        <EventCustomise />
    </div>
  );
}

export default EventCreate;