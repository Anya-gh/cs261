import React from "react";
import { render, screen, waitFor, act, fireEvent } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import { BrowserRouter as Router, MemoryRouter, Route } from 'react-router-dom';
const { PrismaClient } = require('../../../api/node_modules/@prisma/client');
import App from '../App';

describe("<App />", () => {

    it("renders without crash", () => {
        render(<Router><App /></Router>);
    });

    it("redirects to EventCreate page, then to Review page", async () => {
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

        fireEvent.click(screen.getByText("Create new event"));
        expect(location.pathname).toEqual("/EventCreate");

        /*const emptyArray = [];
        const newMap = new Map();
        const mockSuccessResponse = {eventID: 1, eventObject: {eventname: 'Event 1', people: 2, interval: 2, length: 20, time: Date.now()}, templateObject: {questionArray: [{type: "text", description: "How is the event?", options: emptyArray, id: 1}]},
                                    forumObject: {},  analysisObject: {moodArray: emptyArray, currentMood: 0, selectedInterval: 0, length: 0, mostRecentResponse: newMap}, attKey: 971, hostKey: 1041};
        const mockJsonPromise = Promise.resolve(mockSuccessResponse);
        const mockFetchPromise = Promise.resolve({ 
          json: () => mockJsonPromise,
        });
        jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);*/
        new XMLHttpRequest()

        //act(() => {
        fireEvent.change(screen.getByLabelText("Enter title of the event:"), { target: { value: 'Test Title' } })
        //userEvent.type(screen.getByLabelText("Enter title of the event:"), "Test Title");
        fireEvent.change(screen.getByLabelText("Enter the length of the event:"), { target: { value: '60' } })
        //userEvent.type(screen.getByLabelText("Enter the length of the event:"), "120");
        fireEvent.change(screen.getByLabelText("Choose a type of event:"), { target: { value: '1' } })
        //userEvent.selectOptions(screen.getByLabelText("Choose a type of event:"), "1");
        fireEvent.change(screen.getByLabelText("Choose analysis frequency:"), { target: { value: '5' } })
        //userEvent.type(screen.getByLabelText("Choose analysis frequency:"), "8");
        fireEvent.change(screen.getByLabelText("Choose number of people attending:"), { target: { value: '30' } })
        //userEvent.type(screen.getByLabelText("Choose number of people attending:"), "30");
        fireEvent.change(screen.getByLabelText("Import a Template:"), { target: { value: '1' } })
        //userEvent.selectOptions(screen.getByLabelText("Import a Template:"), "1");
        //fireEvent.click(screen.getByText("Import Template"))
        //userEvent.click(screen.getByText("Import Template"));
        fireEvent.change(screen.getByPlaceholderText("Enter your question here"), { target: { value: 'Test question?' } })
        //userEvent.type(screen.getByPlaceholderText("Enter your question here"), "Test question?");
        fireEvent.change(screen.getByTestId("Qtype"), { target: { value: 'text' } })
        //userEvent.selectOptions(screen.getByTestId("Qtype"), "text");
        fireEvent.click(screen.getByRole("button", {name: "+"}))
        //userEvent.click(screen.getByRole("button", {name: "+"}));
        //userEvent.click(screen.getByText("Create new event"));
        //});
        /*act(() => {*/ fireEvent.click(screen.getByText("Create new event"))
          //userEvent.click(screen.getByText("Create new event"));*/ });
        //await expect(location.pathname).resolves.toMatch(new RegExp("^/Review/104?"));
        await waitFor(() => expect(location.pathname).toMatch(new RegExp("^/Review/104")));
      });
/*
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

      it("does NOT redirect to Review/HostKey page for invalid HostKey", async () => {
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
        await expect(screen.getByText("Key is invalid. Please try again.")).resolves.not.toBeNull();
        userEvent.type(screen.getByTestId("HostKeyInput"), "1999"); //1999 is an invalid host key
        userEvent.click(screen.getByTestId("HostLogin"));
        expect(location.pathname).toEqual("/");
        await expect(screen.getByText("Key is invalid. Please try again.")).resolves.not.toBeNull();
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
        const prisma = new PrismaClient();
        const r4 = prisma.response.findUnique({where: {responseID: 1}});
        expect(r4).resolves.toEqual({responseID: 1, eventID: 111, userID: 1, responseObject: {time: 1615388569598, interval: 1, answers: ["answer1"], mood: 0, name: "Test Name", context: "answer2"}});
        prisma.$disconnect();
      });

      it("does NOT redirect to Feedback/AttendeeKey page for invalid key", async() => {
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
        userEvent.click(screen.getByText("AttendeeLogin"));
        expect(location.pathname).toEqual("/");
        await expect(screen.getByText("Key is invalid. Please try again.")).resolves.not.toBeNull();
        userEvent.type(screen.getByTestId("AttendeeKeyInput"), "2199"); //2199 is an invalid key
        userEvent.type(screen.getByTestId("AttendeeNameInput"), "Test Name");
        userEvent.click(screen.getByTestId("AttendeeLogin"));
        expect(location.pathname).toEqual("/");
        await expect(screen.getByText("Key is invalid. Please try again.")).resolves.not.toBeNull();
      });

      it("does NOT redirect to Feedback/AttendeeKey page for invalid name", async done => {
          this.timeout(20000);
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
          //await expect(screen.getByText("Key is invalid. Please try again.")).resolve.not.toBeNull();
          await waitFor(() => expect(screen.getByText("Key is invalid. Please try again.")).not.toBeNull());
          done();
      });
        let location
        const baseElement = render(
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
        await expect(baseElement.getByText("Key is invalid. Please try again.")).not.toBeNull();
        done();
      });*/
});
/*
describe("stored new stuff", () => {
  test("feedback submission", async () => {
    const prisma = new PrismaClient();
    try {
      const r4 = prisma.response.findUnique({where: {responseID: 4}});
      expect(r4).resolves.toEqual({responseID: 4, eventID: 2, userID: 3, responseObject: {time: 1615388569598, interval: 1, answers: ["This part is boring."], mood: 3, name: "User 3", context: "no ctx"}});
    } catch(e) {
      throw e;
    } finally {
      prisma.$disconnect();
    }
  });
});*/