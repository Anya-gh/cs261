import React from "react";
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Head from '../Head';

describe("<Head />", () => {
    it("renders without crash", () => {
        render(<Router><Head /></Router>);
    });
    it("renders content", () => {
        const comp = render(<Router><Head /></Router>);
        expect(comp.getByRole("link", {name: "Event LiFePro"})).not.toBeNull();
        expect(comp.getByText(/The live feedback provider/).tagName).toBe("H3");
    });
});