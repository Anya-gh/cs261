import React from "react";
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import AttendeeAccess from '../../src/AttendeeAccess';

describe("<AttendeeAccess />", () => {
    it("renders without crash", () => {
        render(<Router><AttendeeAccess /></Router>);
    });
    it("renders content", () => {
        const comp = render(<Router><AttendeeAccess /></Router>);
        expect(comp.getByText(/Attendee access/).tagName).toBe("H1");
        expect(comp.getByText(/Access an event as attendee:/).tagName).toBe("H3");
        expect(comp.getByPlaceholderText(/Enter key here/).tagName).toBe("INPUT");
        expect(comp.getByPlaceholderText(/Enter your name here/).tagName).toBe("INPUT");
        expect(comp.getByText(/Login/).tagName).toBe("BUTTON");
    });
});