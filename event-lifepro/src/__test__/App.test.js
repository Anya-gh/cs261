import React from "react";
import { render, screen, waitFor, act, fireEvent } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import { BrowserRouter as Router, MemoryRouter, Route } from 'react-router-dom';
const { PrismaClient } = require('../../../api/node_modules/@prisma/client');
import App from '../App';
const backend = require('../../../api/Backend');

describe("<App />", () => {

    it("renders without crash", () => {
        render(<Router><App /></Router>);
    });

    it("redirects to EventCreate page, creates new event and redirects to Review page", async () => {
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

        act(() => userEvent.click(screen.getByText("Create new event")));
        expect(location.pathname).toEqual("/EventCreate");

        const mockSuccessResponse1 = {hostKey: 1041, attKey: 971};
        const mockJsonPromise1 = Promise.resolve(mockSuccessResponse1);
        const mockFetchPromise1 = Promise.resolve({ 
          json: () => mockJsonPromise1,
        });
        jest.spyOn(window, 'fetch').mockImplementationOnce(() => mockFetchPromise1);

        const mockSuccessResponse2 = {response: [], analysisObject: {currentMood: 0, length: 60, moodArray: [], mostRecentResponse: {}, selectedInterval: 5},
                                    attKey: 971, hostKey: 1041, templateObject: {questionArray: [{description: ["Test question?", []], flag: "false", type: "text"}]},
                                    eventObject: {time: Date.now(), people: 30, length: 60, interval: 5, eventname: "Test Title"}};
        const mockJsonPromise2 = Promise.resolve(mockSuccessResponse2);
        const mockFetchPromise2 = Promise.resolve({ 
          json: () => mockJsonPromise2,
        });
        jest.spyOn(window, 'fetch').mockImplementationOnce(() => mockFetchPromise2);

        await waitFor(() => expect(screen.getByText("All fields are required.")).not.toBeNull());
        await act( async () => userEvent.type(screen.getByLabelText("Enter title of the event:"), 'Test Title'));
        await act( async () => userEvent.type(screen.getByLabelText("Enter the length of the event:"), '60'));
        await act( async () => userEvent.type(screen.getByLabelText("Choose a type of event:"), '1'));
        await act( async () => userEvent.type(screen.getByLabelText("Choose analysis frequency:"), '5'));
        await act( async () => userEvent.type(screen.getByLabelText("Choose number of people attending:"), '30'));
        await act( async () => userEvent.type(screen.getByLabelText("Import a Template:"), '1'));
        await act( async () => userEvent.type(screen.getByPlaceholderText("Enter your question here"), 'Test question?'));
        await act( async () => userEvent.type(screen.getByTestId("Qtype"), 'text'));
        await act( async () => userEvent.click(screen.getByRole("button", {name: "+"})));
        expect(screen.queryByText("All fields are required.")).toBeNull();
        await act( async () => userEvent.click(screen.getByText("Create new event")));
        await waitFor(() => expect(location.pathname).toMatch(new RegExp("^/review/104")));

        const prisma = new PrismaClient();
        const r1 = await prisma.event.findMany({where: {}});
        const prev_length = r1.length;
        await backend.createNewSession("Test Title", 30, 5, 60, Date.now(), ["text"], ["Test question?"]); // the api is mocked, so we have to call the backend to create the event
        const r2 = await prisma.event.findMany({where: {}});
        expect(r2).toHaveLength(prev_length+1); 
        await prisma.$disconnect();

      });

      it("redirects to Review/HostKey page for valid HostKey", async () => {
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

        const mockSuccessResponse1 = "";
        const mockJsonPromise1 = Promise.resolve(mockSuccessResponse1);
        const mockFetchPromise1 = Promise.resolve({ 
          json: () => mockJsonPromise1,
        });
        jest.spyOn(window, 'fetch').mockImplementationOnce(() => mockFetchPromise1);

        const mockSuccessResponse2 = {response: [{userID: 1111, responseObject: { interval: 0, answers: [{content: "It is good.", questionID: 0}], context: "no ctx", mood: 0.5, name:"Test User 1", time: 1615628804966}},
                                                {userID: 1112, responseObject: { interval: 0, answers: [{content: "It is boring.", questionID: 0}], context: "no ctx", mood: -0.5, name:"Test User 2", time: 1615628804967}}],
                                    analysisObject: {currentMood: 0, length: 20, moodArray: [], mostRecentResponse: {}, selectedInterval: 2},
                                    attKey: 971, hostKey: 1041, templateObject: {questionArray: [{description: ["How is the event?", []], flag: "false", type: "text"}]},
                                    eventObject: {time: 1615627767065, people: 25, length: 20, interval: 2, eventname: "Test Event 1"}};
        const mockJsonPromise2 = Promise.resolve(mockSuccessResponse2);
        const mockFetchPromise2 = Promise.resolve({ 
          json: () => mockJsonPromise2,
        });
        jest.spyOn(window, 'fetch').mockImplementationOnce(() => mockFetchPromise2)

        await act( async () => userEvent.type(screen.getByTestId("HostKeyInput"), '1041'));
        await act( async () => userEvent.click(screen.getByTestId("HostLogin")));;
        await waitFor(() => expect(location.pathname).toEqual("/review/1041"));
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

        
        const mockSuccessResponse1 = "Key is invalid. Please try again.";
        const mockJsonPromise1 = Promise.resolve(mockSuccessResponse1);
        const mockFetchPromise1 = Promise.resolve({ 
          json: () => mockJsonPromise1,
        });
        jest.spyOn(window, 'fetch').mockImplementation(() => mockFetchPromise1);
        

        await act( async () => userEvent.type(screen.getByTestId("HostKeyInput"), '999')); //999 is an invalid host key
        await act( async () => userEvent.click(screen.getByTestId("HostLogin")));
        await waitFor(() => expect(location.pathname).toEqual("/"));
        await waitFor(() => expect(screen.getByText("Key is invalid. Please try again.")).not.toBeNull());
      });

      it("redirects to Feedback/AttendeeKey page for valid key+name and feedback submission works", async () => {
        await act( async () => {
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
        
          const mockSuccessResponse1 = "";
          const mockJsonPromise1 = Promise.resolve(mockSuccessResponse1);
          const mockFetchPromise1 = Promise.resolve({ 
            json: () => mockJsonPromise1,
          });
          jest.spyOn(window, 'fetch').mockImplementationOnce(() => mockFetchPromise1);
        
          const mockSuccessResponse2 = {eventID: 1111, templateObject: {questionArray: [{description: ["How is the event?", []], flag: "false", type: "text"}]},
                                      eventObject: {time: 1615627767065, people: 25, length: 20, interval: 2, eventname: "Test Event 1"}};
          const mockJsonPromise2 = Promise.resolve(mockSuccessResponse2);
          const mockFetchPromise2 = Promise.resolve({ 
            json: () => mockJsonPromise2,
          });
          jest.spyOn(window, 'fetch').mockImplementationOnce(() => mockFetchPromise2);
      
          const mockSuccessResponse3 = "success";
          const mockJsonPromise3 = Promise.resolve(mockSuccessResponse3);
          const mockFetchPromise3 = Promise.resolve({ 
            json: () => mockJsonPromise3,
          });
          jest.spyOn(window, 'fetch').mockImplementationOnce(() => mockFetchPromise3);
        
          await act( async () => {
            userEvent.type(screen.getByTestId("AttendeeKeyInput"), "971")
            userEvent.type(screen.getByTestId("AttendeeNameInput"), 'Test Name')
          });
          await act( async () => userEvent.click(screen.getByTestId("AttendeeLogin")));
          await waitFor(() => expect(location.pathname).toEqual("/feedback/971/Test Name"));

          /*const prisma = new PrismaClient();
          const r1 = await prisma.response.findMany({where: {eventID: 1111}});
          const prev_length = r1.length;*/
          await new Promise((r) => setTimeout(r, 1000));

          const answerBoxes = screen.getAllByRole("textbox");
          expect(answerBoxes).toHaveLength(2);
          const i = 1;
          for (const box of answerBoxes) {
            if (i < answerBoxes.length+1) {
              await act( async () => userEvent.type(box, "answer".concat(i.toString())));
            }
          }
          await act( async () => userEvent.click(screen.getByText("Submit")));
          await waitFor(() => expect(screen.getByText("Thank you for your submission!")).not.toBeNull());
          await waitFor(() => expect(screen.getByText("You may submit again to update your feedback.")).not.toBeNull());

          /*const r2 = await prisma.response.findMany({where: {eventID: 1111}});
          expect(r2).toHaveLength(prev_length);  // would be prev_length+1, but api is mocked so DB is not updated
          prisma.$disconnect();*/
        });
      });

      it("does NOT redirect to Feedback/AttendeeKey page for invalid key", async () => {
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

        
        const mockSuccessResponse1 = "Key is invalid. Please try again.";
        const mockJsonPromise1 = Promise.resolve(mockSuccessResponse1);
        const mockFetchPromise1 = Promise.resolve({ 
          json: () => mockJsonPromise1,
        });
        jest.spyOn(window, 'fetch').mockImplementation(() => mockFetchPromise1);

        await act( async () => {
          userEvent.type(screen.getByTestId("AttendeeKeyInput"), '9999') //999 is an invalid key
          userEvent.type(screen.getByTestId("AttendeeNameInput"), 'Test Name')
          userEvent.click(screen.getByTestId("AttendeeLogin"))
        });
        await waitFor(() => expect(location.pathname).toEqual("/"));
        await waitFor(() => expect(screen.getByText("Key is invalid. Please try again.")).not.toBeNull());
      });
});