import React from "react";
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Feedback from '../../src/Feedback';

describe("<Feedback />", () => {
    it("toy test", () => {
        expect(true).toBeTruthy();
    });
    /*it("renders without crash", () => {
        render(<Router><Feedback /></Router>);
    });
    it("renders content", () => {
        const comp = render(<Router><Feedback /></Router>);
        //...
    });*/
});