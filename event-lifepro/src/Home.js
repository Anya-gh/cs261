import React, {useState} from "react";

import HostAccess from "./HostAccess";
import AttendeeAccess from "./AttendeeAccess";
import Head from "./Head";

function Home(){

  return(
    <div className="Home">
      <Head />
      <HostAccess />
      <AttendeeAccess />
    </div>
  );
}

export default Home;