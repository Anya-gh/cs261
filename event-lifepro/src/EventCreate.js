import React, {useState} from "react";
import EventCustomise from "./EventCustomise";

import Head from "./Head";

import {Route, Link} from 'react-router-dom';

function EventCreate(){

  return(
    <div className="EventCreate">
        <Head/>
        <EventCustomise />
    </div>
  );
}

export default EventCreate;