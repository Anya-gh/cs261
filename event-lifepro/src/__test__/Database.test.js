const { PrismaClient } = require('../../../api/node_modules/@prisma/client');
import seed from '../../../api/seed';

test("Database functionalities", async () => {
    const prisma = new PrismaClient();
    const p = await seed.populate();
    const emptyArray = [];
    const newMap = {};
    
    const e1 = await prisma.event.findUnique({where: {eventID: 1111}});
    expect(e1).toEqual({eventID: 1111, eventObject: {eventname: 'Test Event 1', people: 25, interval: 2, length: 20, time: 1615627767065}, templateObject: {questionArray: [{flag: "false", type: "text", description: ["How is the event?", []]}]},
                        forumObject: {},  analysisObject: {moodArray: emptyArray, currentMood: 0, selectedInterval: 2, length: 20, mostRecentResponse: newMap}, attKey: 971, hostKey: 1041});
    const e2 = await prisma.event.findUnique({where: {eventID: 1112}});
    expect(e2).toEqual({eventID: 1112, eventObject: {eventname: 'Test Event 2', people: 1, interval: 5, length: 120, time: 1615627767066}, templateObject: {questionArray: [{flag: "false", type: "text", description: ["How is the event?", []]}]},
                        forumObject: {},  analysisObject: {moodArray: emptyArray, currentMood: 0, selectedInterval: 5, length: 120, mostRecentResponse: newMap}, attKey: 972, hostKey: 1042});
    const e3 = await prisma.event.findUnique({where: {eventID: 1113}});
    expect(e3).toEqual({eventID: 1113, eventObject: {eventname: 'Test Event 3', people: 100, interval: 60, length: 600, time: 1615627767067}, templateObject: {questionArray: [{flag: "false", type: "choice", description: ["Can you hear the speaker?", ["Yes", "No"]]}]},
                        forumObject: {},  analysisObject: {moodArray: emptyArray, currentMood: 0, selectedInterval: 60, length: 600, mostRecentResponse: newMap}, attKey: 973, hostKey: 1043});
    
                        const u1 = await prisma.user.findUnique({where: {userID: 1111}});
    expect(u1).toEqual({userID: 1111, eventID: 1111, name: "Test User 1"});
    const u2 = await prisma.user.findUnique({where: {userID: 1112}});
    expect(u2).toEqual({userID: 1112, eventID: 1111, name: "test User 2"});
    const u3 = await prisma.user.findUnique({where: {userID: 1113}});
    expect(u3).toEqual({userID: 1113, eventID: 1113, name: "Test User 3"});
    
    const r1 = await prisma.response.findUnique({where: {responseID: 1111}});
    expect(r1).toEqual({responseID: 1111, eventID: 1111, userID: 1111, responseObject: {time: 1615628804966, interval: 0, answers: [{content: "It is good.", questionID: 0}], mood: 0.5, name: "Test User 1", context: "no ctx"}});
    const r2 = await prisma.response.findUnique({where: {responseID: 1112}});
    expect(r2).toEqual({responseID: 1112, eventID: 1111, userID: 1112, responseObject: {time: 1615628804967, interval: 0, answers: [{content: "It is boring.", questionID: 0}], mood: -0.5, name: "Test User 2", context: "no ctx"}});
    const r3 = await prisma.response.findUnique({where: {responseID: 1113}});
    expect(r3).toEqual({responseID: 1113, eventID: 1113, userID: 1113, responseObject: {time: 1615628804968, interval: 0, answers: [{content: "0", questionID: 0}], mood: 0.5, name: "Test User 3", context: "no ctx"}});
    const r4 = await prisma.response.findUnique({where: {responseID: 1114}});
    expect(r4).toEqual({responseID: 1114, eventID: 1113, userID: 1113, responseObject: {time: 1615628805066, interval: 0, answers: [{content: "1", questionID: 0}], mood: -0.5, name: "Test User 3", context: "no ctx"}});
    
    await prisma.$disconnect();
});