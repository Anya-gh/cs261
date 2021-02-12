import React, {useState} from "react";

import HostAccess from "./HostAccess";
import AttendeeAccess from "./AttendeeAccess";
import Head from "./Head";

function Home(){
//Java script Logic

  return(
    //JSX aka HTML Code
    <div className="Home">
      {/* This is how to comment in JSX*/}
      <header><Head compname="Event LiFePro" slogan="The live feedback provider"/></header>
      
      {/*Host access section*/}

      <HostAccess />

      {/*Attendee access section*/}

      <AttendeeAccess />
    </div>
  );
}

export default Home;