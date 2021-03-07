import React, { useState } from "react";
import {  render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import { BrowserRouter as Router, MemoryRouter, Route, useHistory } from 'react-router-dom';
import App from '../App';

describe("<App />", () => {

    it("renders without crash", () => {
        render(<Router><App /></Router>);
    });

    it("Create new event button redirects to EventCreate page", () => {
        let location
        render(
          <MemoryRouter initialEntries={["/"]}>
            <Route path="/">
              <App />
            </Route>
            <Route
              path="/*"
              render={({ location: loc }) => {
                location = loc
                return null
              }}
            />
          </MemoryRouter>
        );

        userEvent.click(screen.getByText("Create new event"));
        expect(location.pathname).toEqual("/EventCreate");
      });

      it("Host Login button redirects to Review/HostKey page", () => {
        let location
        render(
          <MemoryRouter initialEntries={["/"]}>
            <Route path="/">
              <App />
            </Route>
            <Route
              path="/*"
              render={({ location: loc }) => {
                location = loc
                return null
              }}
            />
          </MemoryRouter>
        );

        userEvent.type(screen.getByTestId("HostKeyInput"), "123456");
        userEvent.click(screen.getByTestId("HostLogin"));
        expect(location.pathname).toEqual("/Review/123456");
      });

      it("Attendee Login button redirects to Feedback/AttendeeKey page", () => {
        let location
        render(
          <MemoryRouter initialEntries={["/"]}>
            <Route path="/">
              <App />
            </Route>
            <Route
              path="/*"
              render={({ location: loc }) => {
                location = loc
                return null
              }}
            />
          </MemoryRouter>
        );

        userEvent.type(screen.getByTestId("AttendeeKeyInput"), "123456");
        userEvent.type(screen.getByTestId("AttendeeNameInput"), "Test Name");
        userEvent.click(screen.getByTestId("AttendeeLogin"));
        expect(location.pathname).toEqual("/Feedback/123456");
      });
});