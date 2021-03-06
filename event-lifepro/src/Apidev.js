import React, { Component } from "react";
import "./App.css";

//maybe create a set of fetch functions instead that return the required
//data which are then used asynchronously in each of the React js UI files


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

//retrieves [user, event, template, forum] objects for a user when a name is provided
//and the attendee key. This also adds the user to the DB if they don't already exist
//before retrieving the objects.
//meant to be used when an attendee enters their name and their key.
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
//val is an object that contains [event, userObject] objects. event object contains 
//[eventObject, templateObject, forumObject] objects from which a key-value pair exist
//similarly so for userObject. Thus userObject.name will retrieve a string which is the
//name of the attendee. 


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
        console.log(revmultiObj.response[0].responseObject.Question1);
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