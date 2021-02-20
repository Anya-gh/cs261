import React from "react";
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import HostAccess from '../../src/HostAccess';

describe("<HostAccess />", () => {
    it("renders without crash", () => {
        render(<Router><HostAccess /></Router>);
    });
    it("renders content", () => {
        const comp = render(<Router><HostAccess /></Router>);
        expect(comp.getByText(/Host access/).tagName).toBe("H1");
        expect(comp.getByText(/Access an event as host:/).tagName).toBe("H3");
        expect(comp.getByPlaceholderText(/Enter key here/).tagName).toBe("INPUT");
        expect(comp.getByText(/Login/).tagName).toBe("BUTTON");
        expect(comp.getByText(/Create new event/).tagName).toBe("A");
    });
});