const { PrismaClient } = require('@prisma/client');
const seed = require('../../../api/seed');
//Imports the PrismaClient constructor for @prismaclient node module

const prisma = new PrismaClient();
//Instantiate PrismaClient

seed.populate();

describe("Database", () => {
    it("created events", () => {
        expect(prisma.event.findUnique({where: {eventID: 111, eventObject: {name: 'Event 1', people: 2, interval: 0, length: 0, time: 0}, templateObject: {typeArray: ["open"], descriptionArray: ["How is the event?"]},
                                                forumObject: {Post: "Cannot hear the speaker",}, analysisObject: {currentInterval: 0, selectedInterval: 0, length: 0,}}})).toBeTruthy();
        expect(prisma.event.findUnique({where: {eventID: 112, eventObject: {name: 'Event 2', people: 1, interval: 0, length: 0, time: 0}, templateObject: {typeArray: ["open"], descriptionArray: ["How is the event?"]},
                                                forumObject: {Post: "Cannot hear the speaker",}, analysisObject: {currentInterval: 0, selectedInterval: 0, length: 0,}}})).toBeTruthy();
        expect(prisma.event.findUnique({where: {eventID: 113, eventObject: {name: 'Event 3', people: 0, interval: 0, length: 0, time: 0}, templateObject: {typeArray: ["open"], descriptionArray: ["How is the event?"]},
                                                forumObject: {Post: "Cannot hear the speaker",}, analysisObject: {currentInterval: 0, selectedInterval: 0, length: 0,}}})).toBeTruthy();
    });
    it("created keys", () => {
        expect(prisma.key.findUnique({where: {keyID: 1111, eventID: 111, keyObject: {attendeeKey: "attK 1", hostKey: "hK 1"}}})).toBeTruthy();
        expect(prisma.key.findUnique({where: {keyID: 1112, eventID: 112, keyObject: {attendeeKey: "attK 2", hostKey: "hK 2"}}})).toBeTruthy();
        expect(prisma.key.findUnique({where: {keyID: 1113, eventID: 113, keyObject: {attendeeKey: "attK 3", hostKey: "hK 3"}}})).toBeTruthy();
    });
    it("created users", () => {
        expect(prisma.user.findUnique({where: {userID: 11111, eventID: 111, userObject: {name: "User 1"}}})).toBeTruthy();
        expect(prisma.user.findUnique({where: {userID: 11112, eventID: 111, userObject: {name: "User 2"}}})).toBeTruthy();
        expect(prisma.event.findUnique({where: {userID: 11113, eventID: 112, userObject: {name: "User 3"}}})).toBeTruthy();
    });
    it("created responses", () => {
        expect(prisma.response.findUnique({where: {responseID: 111111, eventID: 111, userID: 11111, responseObject: {userID: 11111, time: "0910", answers: ["It is good"]}}})).toBeTruthy();
        expect(prisma.response.findUnique({where: {responseID: 111112, eventID: 111, userID: 11112, responseObject: {userID: 11112, time: "0950", answers: ["It is boring"]}}})).toBeTruthy();
        expect(prisma.response.findUnique({where: {responseID: 111113, eventID: 112, userID: 11113, responseObject: {userID: 11113, time: "1930", answers: ["I like it so far"]}}})).toBeTruthy();
        expect(prisma.response.findUnique({where: {responseID: 111113, eventID: 112, userID: 11113, responseObject: {userID: 11113, time: "1945", answers: ["This part is not interesting"]}}})).toBeTruthy();
    });
});

prisma.$disconnect();