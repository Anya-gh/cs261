import { useState, useEffect } from 'react';
import React from 'react';

function Review({match}) {

    const [event, setEvent] = useState([]);

    useEffect(() => {
        getEvent();
    }, []);

    const getEvent = async () => {
    // give api url (for database) and key to get event from db
    // below is just a placeholder, (dont use this yet! it doesn't do anything, and it probably doesn't work).
    const response = await fetch(`http://localhost:3000/${match.key}`);
    const data = await response.json();
    // take w/e attributes are needed from data
    setEvent(data);
    };

    return(
        <form>

        </form>
    );
}

export default Review;