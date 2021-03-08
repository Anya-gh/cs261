import React from "react";
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import EventCreate from '../EventCreate';

describe("<EventCreate />", () => {
    it("renders without crash", () => {
        render(<Router><EventCreate /></Router>);
    });
    it("renders content", () => {
        const display = render(<Router><EventCreate /></Router>);
        
        expect(display.getByRole("heading", {name: "Event LiFePro"})).not.toBeNull();
        expect(display.getByRole("heading", {name: "The live feedback provider"})).not.toBeNull();
        expect(display.getByRole("heading", {name: "Create event"})).not.toBeNull();
        expect(display.getByRole("textbox", {name: "Enter title of the event:"})).not.toBeNull();
        expect(display.getByRole("textbox", {name: "Enter name of host:"})).not.toBeNull();
        expect(display.getByLabelText(/From/).tagName).toBe("INPUT");
        expect(display.getByLabelText(/to:/).tagName).toBe("INPUT");
        expect(display.getByRole("combobox", {name: "Choose a type of event:"})).not.toBeNull();
        expect(display.getByRole("spinbutton", {id: "Choose analysis frequency:"})).not.toBeNull();
        expect(display.getByLabelText(/Choose number of people attending:/)).not.toBeNull();
        expect(display.getByRole("combobox", {name: "Import a Template:"})).not.toBeNull();
        expect(display.getByRole("button", {name: "Import Template"})).not.toBeNull();
        expect(display.getByRole("button", {name: "Create new event"})).not.toBeNull();
    });
});