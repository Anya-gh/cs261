import React from "react";
import { render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import { BrowserRouter as Router, MemoryRouter, Route } from 'react-router-dom';
const { PrismaClient } = require('../../../api/node_modules/@prisma/client');
import seed from '../../../api/seed';
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
        userEvent.type(screen.getByLabelText("Enter the length of the event:"), "120");
        userEvent.selectOptions(screen.getByLabelText("Choose a type of event:"), "1");
        userEvent.type(screen.getByLabelText("Choose analysis frequency:"), "8");
        userEvent.type(screen.getByLabelText("Choose number of people attending:"), 30);
        userEvent.selectOptions(screen.getByLabelText("Import a Template:"), "1");
        userEvent.click(screen.getByText("Import Template"));
        userEvent.click(screen.getByText("Create new event"));
        expect(location.pathname).toEqual("/Review/");*/
      });

      it("redirects to Review/HostKey page for valid HostKey", () => {
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

        userEvent.type(screen.getByTestId("HostKeyInput"), "111112");
        userEvent.click(screen.getByTestId("HostLogin"));
        expect(location.pathname).toEqual("/Review/111112");
      });

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
        userEvent.type(screen.getByTestId("HostKeyInput"), "1999"); //1999 is an invalid host key
        userEvent.click(screen.getByTestId("HostLogin"));
        expect(location.pathname).toEqual("/");
        expect(screen.getByTestId("HostNotice")).not.toBeNull();
      });

      it("redirects to Feedback/AttendeeKey page for valid key+name and feedback submission works", async () => {
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

        userEvent.type(screen.getByTestId("AttendeeKeyInput"), "21111");
        userEvent.type(screen.getByTestId("AttendeeNameInput"), "Test Name");
        userEvent.click(screen.getByTestId("AttendeeLogin"));
        await expect(location.pathname).toEqual("/Feedback/21111/Test Name");

        const answerBoxes = screen.getAllByRole("textbox");
        expect(answerBoxes).toHaveLength(2);
        const i = 1;
        for (const box of answerBoxes) {
          if (i < answerBoxes.length+1) {
            userEvent.type(box, "answer".concat(i.toString()));
          }
        }
        userEvent.click(screen.getByText("Submit"));
        /*const prisma = new PrismaClient();
        const r4 = prisma.response.findUnique({where: {responseID: 1}});
        expect(r4).resolves.toEqual({responseID: 1, eventID: 111, userID: 1, responseObject: {time: 1615388569598, interval: 1, answers: ["answer1"], mood: 0, name: "Test Name", context: "answer2"}});
        prisma.$disconnect();*/
      });

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
        userEvent.type(screen.getByTestId("AttendeeKeyInput"), "2199"); //2199 is an invalid key
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

        userEvent.type(screen.getByTestId("AttendeeKeyInput"), "21112"); //111 is a valid key
        userEvent.type(screen.getByTestId("AttendeeNameInput"), ""); // empty string is an invalid name
        userEvent.click(screen.getByTestId("AttendeeLogin"));
        expect(location.pathname).toEqual("/");
        expect(screen.getByTestId("AttendeeNotice")).not.toBeNull();
      });
});

describe("stored new stuff", () => {
  test("feedback submission", async () => {
    const prisma = new PrismaClient();
    const r4 = prisma.response.findUnique({where: {responseID: 111114}});
    expect(r4).resolves.toEqual({responseID: 111114, eventID: 112, userID: 11113, responseObject: {time: 1615388569598, interval: 1, answers: ["This part is boring."], mood: 3, name: "User 4", context: "no ctx"}});
    prisma.$disconnect();
  });
});