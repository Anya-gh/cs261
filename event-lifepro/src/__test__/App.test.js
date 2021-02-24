import React from "react";
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from '../../src/App';

describe("<App />", () => {
    it("renders without crash", () => {
        render(<Router><App /></Router>);
    });
});