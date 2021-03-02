import React, { Component } from "react";
import "./App.css";

//maybe create a set of fetch functions instead that return the required
//data which are then used asynchronously in each of the React js UI files


//Put the following in App.js to actually use within React
//import Apidev from './Apidev';
//<Route exact path="/Apidev" component={Apidev}/>

class Apidev extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    }

    componentDidMount() {

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