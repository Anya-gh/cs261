import React, { Component } from "react";
import "./App.css";

//maybe create a set of fetch functions instead that return the required
//data which are then used asynchronously in each of the React js UI files

async function postTmplt (url, data) {
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

//Put the following in App.js to actually use within React
//import Apidev from './Apidev';
//<Route exact path="/Apidev" component={Apidev}/>

//retrieves a specific object [event|forum|analysis|template|response] given an event id
//queryObj defines which object to retrieve and id is the event id
async function Query (queryObj, id) {
    const evObj = await fetch("http://localhost:3000/queries/" + queryObj + "/" + id)
    .then(response => response.json())
    .catch(error => console.log(error));
    return (evObj);
}
//retrieves the key value pairs within required Object
//retrieve values by doing: evObj.key

//meant to be used when an attendee enters their key.
async function attAccess (attkey) {
    const keycheck = await fetch("http://localhost:3000/attendee/key/" + attkey)
    .then(response => response.json())
    .catch(error => console.log(error));
    return keycheck;
}
//keycheck is an object that contains exist and eventID.


//retrieves [event|template] object given an event ID. 
//To be used when retrieving a template, for the host to change the questions
//may need to be changed to edit it to retrieve multiple templates if required
async function feedRetrieve (evID) {
    const feedObjs = await fetch("http://localhost:3000/attendee/feedback/" + evID)
    .then(response => response.json())
    .catch(error => console.log(error));
    return feedObjs;
}
//feedObjs is an object than contains [eventObject, templateObject]

//retrieves [array of response] objects given an event ID
//meant to be used for the Review page where the aforementioned objects will 
//be shown to the host
async function revRetrieve (evID) {
    const revObjs = await fetch("http://localhost:3000/host/review/" + evID)
    .then(response => response.json())
    .catch(error => console.log(error));
    return revObjs;
}
//revObjs is an object that contains [anaylysisObject, eventObject, response].
//response is an array that contains many responseObject.
//so revObjs.response[0].responseObject.key to return a value within key


//the below functions may not work as it required TempBackend to be exporting
//by putting the following at the end
/*
exports.createNewResponse = createNewResponse;
exports.createNewEvent = createNewEvent;
exports.createNewUser = createNewUser;
*/
//also must uncomment some functions that relate to TempBackend in attendee.js and host.js

//response submission function, also checks/creates for the name of the attendee
async function resSubmit (eventID, userID, answerArray) {
    //must add name and anonymous fields, removing userID as no longer required.
    const url = 'http://localhost:3000/attendee/response';
    let data = {
        //"name":name,
        //"anonymous":anonymous
        "eventID":eventID,
        "userID":userID, //remove
        "answerArray":answerArray,
    }
    const val = await postTmplt(url, data);
    return val;
}

//event creation function
async function eventCreate (eventName, peopleNum, typeArray, descriptionArray) {
    const url = 'http://localhost:3000/host/createEvent';
    let data = {
        "eventName":eventName,
        "peopleNum":peopleNum,
        "typeArray":typeArray,
        "descriptionArray":descriptionArray,
    }
    const val = await postTmplt(url, data);
    return val; //returns success at the end.
}

//user creating function - primarily for the host.
async function userCreate (name, eventID) {
    const url = 'http://localhost:3000/host/createUser';
    let data = {
        "name":name,
        "eventID":eventID,
    }
    const val = await postTmplt(url, data);
    return val;
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
        let submitcheck = await resSubmit(1, 1, ["peas be rad", "tomatoes be ugly"]);
        console.log(submitcheck);
        console.log(evObj);
        console.log(attobjects);
        console.log(multiObj);
        console.log(revmultiObj.response[0].responseObject.Question1);

        let event = await eventCreate("Banana", 34, ["Can you split"], ["Nope"]);
        let user =  await userCreate("New sample", 1);
        console.log(event);
        console.log(user);
        /*attobjects = await attAccess("sample", "1"); //both string and int values accepted.
        console.log(attobjects);*/
        
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