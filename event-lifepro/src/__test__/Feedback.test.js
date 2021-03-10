import React from "react";
import { render } from '@testing-library/react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Feedback from '../Feedback';

describe("<Feedback />", () => {
    it("renders without crash", () => {
        render(<Router><Route path="/Feedback/1/name"><Feedback /></Route></Router>);
    });
    /*it("renders content", () => {
        const comp = render(<Router><Feedback /></Router>);
        //...
    });*/
});