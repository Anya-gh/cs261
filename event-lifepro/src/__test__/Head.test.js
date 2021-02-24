import React from "react";
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Head from '../../src/Head';

describe("<Head />", () => {
    it("renders without crash", () => {
        render(<Router><Head /></Router>);
    });
    it("renders content", () => {
        const comp = render(<Router><Head /></Router>);
        expect(comp.getByText(/Event LiFePro/).tagName).toBe("H1");
        expect(comp.getByText(/The live feedback provider/).tagName).toBe("H3");
    });
});