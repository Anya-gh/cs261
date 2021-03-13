import React from "react";
import { render, screen, act, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import userEvent from "@testing-library/user-event";
import Feedback from '../Feedback';

describe("<Feedback />", () => {
    it("renders without crash", () => {
        render(<Router><Route path="/Feedback/21111/name"><Feedback /></Route></Router>);
    });
    /*it("submits", async () => {
        await waitFor(() => render(<Router><Route path="/Feedback/21111/name"><Feedback /></Route></Router>));
        const answerBoxes = await screen.findByRole("textbox");
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
    });*/  // could not find the stuff from inside the components: <body> <div /> </body>
});