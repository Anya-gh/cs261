import React from "react";
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import EventCustomise from '../../src/EventCustomise';

describe("<EventCustomise />", () => {
    it("renders without crash", () => {
        render(<Router><EventCustomise /></Router>);
    });
    it("renders content", () => {
        const comp = render(<Router><EventCustomise /></Router>);
        expect(comp.getByText(/Create event/).tagName).toBe("H1");
        expect(comp.getByLabelText(/Enter title of the event:/).tagName).toBe("INPUT");
        expect(comp.getByLabelText(/Enter name of host:/).tagName).toBe("INPUT");
        expect(comp.getByLabelText(/From/).tagName).toBe("INPUT");
        expect(comp.getByLabelText(/to:/).tagName).toBe("INPUT");
        expect(comp.getByLabelText(/Choose a type of event:/).tagName).toBe("SELECT");
        expect(comp.getByLabelText(/Choose analysis frequency:/).tagName).toBe("INPUT");
        expect(comp.getByLabelText(/AnalysisFreqMagnitude/).tagName).toBe("SELECT");
        expect(comp.getByLabelText(/Choose a type of Template:/).tagName).toBe("SELECT");
        expect(comp.getByText(/Create new event/).tagName).toBe("BUTTON");
    });
});