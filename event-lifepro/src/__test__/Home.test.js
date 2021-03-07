import React, { useState } from "react";
import { userEvent, render } from '@testing-library/react';
import { BrowserRouter as Router, MemoryRouter, Route, useHistory } from 'react-router-dom';
import Home from '../Home';

describe("<Home />", () => {
  it("renders without crash", () => {
    render(<Router><Home /></Router>);
  });
  it("renders home page content", () => {
    const display = render(<Router><Home /></Router>);

    expect(display.getByRole("heading", {name: "Event LiFePro"})).not.toBeNull();
    expect(display.getByRole("heading", {name: "The live feedback provider"})).not.toBeNull();
    expect(display.getByRole("heading", {name: "Host access"})).not.toBeNull();
    expect(display.getByRole("heading", {name: "Attendee access"})).not.toBeNull();
    expect(display.getByRole("heading", {name: "Access an event as host:"})).not.toBeNull();
    expect(display.getByRole("heading", {name: "Access an event as attendee:"})).not.toBeNull();
    expect(display.getByTestId("HostKeyInput").tagName).toBe("INPUT");
    expect(display.getByTestId("AttendeeKeyInput").tagName).toBe("INPUT");
    expect(display.getByPlaceholderText("Enter your name here").tagName).toBe("INPUT");
    expect(display.getAllByRole("button", {name: "Login"})).toHaveLength(2);
    expect(display.getByRole("button", {name: "Create new event"})).not.toBeNull();
  });
});
