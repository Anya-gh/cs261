import { useState, useEffect } from 'react';
import React from 'react';

function Review({match}) {

    const [event, setEvent] = useState([]);
    const [valid, setValid] = useState(false);

    useEffect(() => {
        getEvent();
    }, []);

    const getEvent = async () => {
        const response = await fetch(`http://localhost:3000/key/${match.key}`);
        const data = await response.json();
        console.log(data)
        /*console.log(data.exist);
        console.log(data.keycheck);*/
    };

    return(
        <form>

        </form>
    );
}

export default Review;