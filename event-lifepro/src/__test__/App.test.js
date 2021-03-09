import React from "react";
import { render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import { BrowserRouter as Router, MemoryRouter, Route } from 'react-router-dom';
import App from '../App';

describe("<App />", () => {

    it("renders without crash", () => {
        render(<Router><App /></Router>);
    });

    it("redirects to EventCreate page, then to Review page", () => {
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

        /*userEvent.type(screen.getByLabelText("Enter title of the event:"), "Test Title");
        userEvent.type(screen.getByLabelText("Enter name of host:"), "Test Host Name");
        userEvent.type(screen.getByLabelText("From"), "0915");
        userEvent.type(screen.getByLabelText("to"), "1200");
        userEvent.selectOptions(screen.getByLabelText("Choose a type of event:"), "1");
        userEvent.type(screen.getByLabelText("Choose analysis frequency:"), "0005");
        userEvent.type(screen.getByLabelText("Choose number of people attending:"), 30);
        userEvent.selectOptions(screen.getByLabelText("Import a Template:"), "1");
        userEvent.click(screen.getByText("Import Template"));
        userEvent.click(screen.getByText("Create new event"));
        expect(location.pathname).toEqual("/Review/");*/
      });

      /*it("redirects to Review/HostKey page for valid HostKey", () => {
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
      });*/

      it("does NOT redirect to Review/HostKey page for invalid HostKey", () => {
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

        userEvent.type(screen.getByTestId("HostKeyInput"), "999"); //999 is an invalid host key
        userEvent.click(screen.getByTestId("HostLogin"));
        expect(location.pathname).toEqual("/");
        expect(screen.getByTestId("HostNotice")).not.toBeNull();
      });

      /*it("redirects to Feedback/AttendeeKey page for valid key+name", () => {
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
      });*/

      it("does NOT redirect to Feedback/AttendeeKey page for invalid key", () => {
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

        userEvent.type(screen.getByTestId("AttendeeKeyInput"), "999"); //999 is an invalid key
        userEvent.type(screen.getByTestId("AttendeeNameInput"), "Test Name");
        userEvent.click(screen.getByTestId("AttendeeLogin"));
        expect(location.pathname).toEqual("/");
        expect(screen.getByTestId("AttendeeNotice")).not.toBeNull();
      });

      it("does NOT redirect to Feedback/AttendeeKey page for invalid name", () => {
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

        userEvent.type(screen.getByTestId("AttendeeKeyInput"), "111"); //111 is a valid key
        userEvent.type(screen.getByTestId("AttendeeNameInput"), ""); // empty string is an invalid name
        userEvent.click(screen.getByTestId("AttendeeLogin"));
        expect(location.pathname).toEqual("/");
        expect(screen.getByTestId("AttendeeNotice")).not.toBeNull();
      });
});