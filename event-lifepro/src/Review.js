import { useState, useEffect } from 'react';
import React from 'react';

function Review({ match }) {

    const [event, setEvent] = useState([]);
    const [valid, setValid] = useState(false);

    useEffect(() => {
        console.log(match.params.id)
        getEvent();
    }, []);

    const getEvent = async () => {
        const response = await fetch(`http://localhost:3000/host/key/${match.params.id}`);
        const data = await response.json();
        setEvent(data.keycheck);
        setValid(data.exist);
    };

    return(
        <form>

        </form>
    );
}

export default Review;