import React from "react";
import { render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
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
        expect(display.getByRole("spinbutton", {name: "Enter the length of the event:"})).not.toBeNull();
        expect(display.getByRole("combobox", {name: "Choose a type of event:"})).not.toBeNull();
        expect(display.getByRole("spinbutton", {name: "Choose analysis frequency:"})).not.toBeNull();
        expect(display.getByLabelText(/Choose number of people attending:/)).not.toBeNull();
        expect(display.getByRole("combobox", {name: "Import a Template:"})).not.toBeNull();
        expect(display.getByRole("button", {name: "Import Template"})).not.toBeNull();
        expect(display.getByRole("button", {name: "Create new event"})).not.toBeNull();
    });

    it("loads template and adds/removes questions", () => {
        render(<Router><EventCreate /></Router>);
        
        /*userEvent.selectOptions(screen.getByLabelText("Import a Template:"), "1");
        userEvent.click(screen.getByText("Import Template"));
        expect(screen.getByText("How is the event?")).not.toBeNull();*/

        userEvent.type(screen.getByPlaceholderText("Enter your question here"), "My new question?");
        userEvent.click(screen.getByText("+"));
        expect(screen.getByText("My new question?")).not.toBeNull();

        const removeButtons = screen.getAllByText("-");
        userEvent.click(removeButtons[0]);
        var emptyArray = [];
        expect(screen.queryAllByText("How is the event?")).toEqual(emptyArray);
    });
});