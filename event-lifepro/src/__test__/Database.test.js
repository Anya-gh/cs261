const { PrismaClient } = require('../../../api/node_modules/@prisma/client');
import seed from '../../../api/seed';

test("Database", async () => {
    const prisma = new PrismaClient();
    try {
    const p = await seed.populate();
    const emptyArray = [];
    const newMap = {};
    const e1 = await prisma.event.findUnique({where: {eventID: 1}});
    expect(e1).toEqual({eventID: 1, eventObject: {eventname: 'Event 1', people: 2, interval: 2, length: 20, time: 0}, templateObject: {questionArray: [{type: "open", description: "How is the event?"}]},
                         forumObject: {},  analysisObject: {moodArray: emptyArray, currentMood: 0, selectedInterval: 0, length: 0, mostRecentResponse: newMap}, attKey: 94, hostKey: 1041});
    const e2 = await prisma.event.findUnique({where: {eventID: 2}});
    expect(e2).toEqual({eventID: 2, eventObject: {eventname: 'Event 2', people: 1, interval: 12, length: 120, time: 0}, templateObject: {questionArray: [{type: "open", description: "How is the event?"}]},
                         forumObject: {},  analysisObject: {moodArray: emptyArray, currentMood: 0, selectedInterval: 0, length: 0, mostRecentResponse: newMap}, attKey: 942, hostKey: 1042});
    const e3 = await prisma.event.findUnique({where: {eventID: 3}});
    expect(e3).toEqual({eventID: 3, eventObject: {eventname: 'Event 3', people: 100, interval: 30, length: 600, time: 0}, templateObject: {questionArray: [{type: "open", description: "How is the event?"}]},
                         forumObject: {},  analysisObject: {moodArray: emptyArray, currentMood: 0, selectedInterval: 0, length: 0, mostRecentResponse: newMap}, attKey: 943, hostKey: 1043});
    const u1 = await prisma.user.findUnique({where: {userID: 1}});
    expect(u1).toEqual({userID: 1, eventID: 1, name: "User 1"});
    const u2 = await prisma.user.findUnique({where: {userID: 2}});
    expect(u2).toEqual({userID: 2, eventID: 1, name: "User 2"});
    const u3 = await prisma.user.findUnique({where: {userID: 3}});
    expect(u3).toEqual({userID: 3, eventID: 2, name: "User 3"});
    const r1 = await prisma.response.findUnique({where: {responseID: 1}});
    expect(r1).toEqual({responseID: 1, eventID: 1, userID: 1, responseObject: {time: 1615388569598, interval: 1, answers: ["It is good."], mood: 5, name: "User 1", context: "no ctx"}});
    const r2 = await prisma.response.findUnique({where: {responseID: 2}});
    expect(r2).toEqual({responseID: 2, eventID: 1, userID: 2, responseObject: {time: 1615388569598, interval: 1, answers: ["It is boring."], mood: 1, name: "User 2", context: "no ctx"}});
    const r3 = await prisma.response.findUnique({where: {responseID: 3}});
    expect(r3).toEqual({responseID: 3, eventID: 2, userID: 3, responseObject: {time: 1615388569598, interval: 1, answers: ["It is fine so far."], mood: 4, name: "User 3", context: "no ctx"}});
    const r4 = await prisma.response.findUnique({where: {responseID: 4}});
    expect(r4).toEqual({responseID: 4, eventID: 2, userID: 3, responseObject: {time: 1615388569598, interval: 1, answers: ["This part is boring."], mood: 3, name: "User 4", context: "no ctx"}});
    } catch(e) {
        throw e;
    } finally {
        prisma.$disconnect();
    }
});