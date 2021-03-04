import React, { Component } from "react";
import "./App.css";

//maybe create a set of fetch functions instead that return the required
//data which are then used asynchronously in each of the React js UI files


//Put the following in App.js to actually use within React
//import Apidev from './Apidev';
//<Route exact path="/Apidev" component={Apidev}/>

async function Query (queryObj, id) {
    const evObj = await fetch("http://localhost:3000/queries/" + queryObj + "/" + id)
    .then(response => response.json())
    .catch(error => console.log(error));
    return (evObj);
}

async function attAccess (name, attkey) {
    const url = 'http://localhost:3000/attendee/';
    let data = {
        "username": name,
        "attkey": attkey,
    }
    const val = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept' : 'application/json',
            'Content-type' : 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .catch(error => console.log(error));
    return val;
}

async function feedRetrieve (evID) {
    const feedObjs = await fetch("http://localhost:3000/attendee/feedback/" + evID)
    .then(response => response.json())
    .catch(error => console.log(error));
    return feedObjs;
}

async function revRetrieve (evID) {
    const revObjs = await fetch("http://localhost:3000/host/review/" + evID)
    .then(response => response.json())
    .catch(error => console.log(error));
    return revObjs;
}

//below used for testing purposes
class Apidev extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    }

    async componentDidMount() {

        let evObj = await Query("template", 1);
        let attobjects = await attAccess("sample", 1);
        let multiObj = await feedRetrieve(1);
        let revmultiObj = await revRetrieve(1);
        console.log(evObj);
        console.log(attobjects);
        console.log(multiObj);
        console.log(revmultiObj);
        attobjects = await attAccess("sample", "1"); //both string and int values accepted.
        console.log(attobjects);
        
        fetch('http://localhost:3000/users')
        .then(response => response.json())
        .then(res => {
            if (res && res.data) {
                console.log(res.data)
            }
        });
        
    }


    render() {
        return (
            <div className = "Apidev">

            </div>
        );
    }
}

export default Apidev;