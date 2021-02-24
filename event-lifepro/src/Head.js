import React from "react";
import "./App.css";

import {Route, Link} from 'react-router-dom';

function Head(props){

    return (
        <div className="Head">
            <h1>
                <Link to="/">{props.compname}</Link>
            </h1>
      <h3>{props.slogan}</h3>
      <br></br>
        </div>
    );
}
// Use <Head />                                   to render
// Use import Head from "./Head";           to import
export default Head;