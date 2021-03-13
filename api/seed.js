const { PrismaClient, Prisma } = require('@prisma/client');
const DBdeletion = require('./DBdeletion');
//Imports the PrismaClient constructor for @prismaclient node module

/*
    If it does not work the way you wanted or gives errors:
        Try importing like "import seed from 'filelocation'"
        and use seed.populate()
    Also, you might need to use it in an async function since populate is an async as well (dont know much about this stuff)
*/

const populate = async () => {
    const prisma = new PrismaClient();
    try {
        const d = await DBdeletion.deleteAllEvent();
        const emptyArray = [];
        const newMap = new Map();
        const e1 = prisma.event.create ({
            data: {eventID: 1111, eventObject: {eventname: 'Test Event 1', people: 25, interval: 2, length: 20, time: 1615627767065}, templateObject: {questionArray: [{flag: "false", type: "text", description: ["How is the event?", []]}]},
                     forumObject: {},  analysisObject: {moodArray: emptyArray, currentMood: 0, selectedInterval: 2, length: 20, mostRecentResponse: newMap}, attKey: 971, hostKey: 1041}
        });
        const e2 = prisma.event.create ({
            data: {eventID: 1112, eventObject: {eventname: 'Test Event 2', people: 1, interval: 5, length: 120, time: 1615627767066}, templateObject: {questionArray: [{flag: "false", type: "text", description: ["How is the event?", []]}]},
                     forumObject: {},  analysisObject: {moodArray: emptyArray, currentMood: 0, selectedInterval: 5, length: 120, mostRecentResponse: newMap}, attKey: 972, hostKey: 1042}
        });
        const e3 = prisma.event.create ({
            data: {eventID: 1113, eventObject: {eventname: 'Test Event 3', people: 100, interval: 60, length: 600, time: 1615627767067}, templateObject: {questionArray: [{flag: "false", type: "choice", description: ["Can you hear the speaker?", ["Yes", "No"]]}]},
                     forumObject: {},  analysisObject: {moodArray: emptyArray, currentMood: 0, selectedInterval: 60, length: 600, mostRecentResponse: newMap}, attKey: 973, hostKey: 1043}
        });
        //create users
        const u1 = prisma.user.create ({
            data: {userID: 1111, eventID: 1111, name: "Test User 1"}
        });
        const u2 = prisma.user.create ({
            data: {userID: 1112, eventID: 1111, name: "test User 2"}
        });
        const u3 = prisma.user.create ({
            data: {userID: 1113, eventID: 1113, name: "Test User 3"}
        });
        //create responses
        const r0 = prisma.response.create ({
            data: {responseID: 1111, eventID: 1111, userID: 1111, responseObject: {time: 1615628804966, interval: 0, answers: [{content: "It is good.", questionID: 0}], mood: 0.5, name: "Test User 1", context: "no ctx"}}
        });
        const r1 = prisma.response.create ({
            data: {responseID: 1112, eventID: 1111, userID: 1112, responseObject: {time: 1615628804967, interval: 0, answers: [{content: "It is boring.", questionID: 0}], mood: -0.5, name: "Test User 2", context: "no ctx"}}
        });
        const r2 = prisma.response.create ({
            data: {responseID: 1113, eventID: 1113, userID: 1113, responseObject: {time: 1615628804968, interval: 0, answers: [{content: "Yes", questionID: 0}], mood: 0.5, name: "Test User 3", context: "no ctx"}}
        });
        const r3 = prisma.response.create ({
            data: {responseID: 1114, eventID: 1113, userID: 1113, responseObject: {time: 1615628805066, interval: 0, answers: [{content: "No", questionID: 0}], mood: -0.5, name: "Test User 3", context: "no ctx"}}
        });
        const transaction = await prisma.$transaction([e1,e2,e3,u1,u2,u3,r0,r1,r2,r3]);
    } catch(e) {
        throw e;
    } finally {
        prisma.$disconnect();
    }
};

exports.populate = populate;