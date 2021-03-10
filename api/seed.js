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
            data: {eventID: 1, eventObject: {eventname: 'Event 1', people: 2, interval: 2, length: 20, time: 0}, 
                    templateObject: {questionArray: [{type: "open", description: "How is the event?"}]}, forumObject: {},  analysisObject: {moodArray: emptyArray, currentMood: 0, selectedInterval: 0, length: 0, mostRecentResponse: newMap}
                    , attKey: 941, hostKey: 1041}
        });
        const e2 = prisma.event.create ({
            data: {eventID: 2, eventObject: {eventname: 'Event 2', people: 1, interval: 12, length: 120, time: 0}, 
                    templateObject: {questionArray: [{type: "open", description: "How is the event?"}]}, forumObject: {},  analysisObject: {moodArray: emptyArray, currentMood: 0, selectedInterval: 0, length: 0, mostRecentResponse: newMap}
                    , attKey: 942, hostKey: 1042}
        });
        const e3 = prisma.event.create ({
            data: {eventID: 3, eventObject: {eventname: 'Event 3', people: 100, interval: 30, length: 600, time: 0}, 
                    templateObject: {questionArray: [{type: "open", description: "How is the event?"}]}, forumObject: {},  analysisObject: {moodArray: emptyArray, currentMood: 0, selectedInterval: 0, length: 0, mostRecentResponse: newMap}
                    , attKey: 943, hostKey: 1043}
        });
        //create users
        const u1 = prisma.user.create ({
            data: {userID: 1, eventID: 1, name: "User 1"}
        });
        const u2 = prisma.user.create ({
            data: {userID: 2, eventID: 1, name: "User 2"}
        });
        const u3 = prisma.user.create ({
            data: {userID: 3, eventID: 2, name: "User 3"}
        });
        //create responses
        const r0 = prisma.response.create ({
            data: {responseID: 1, eventID: 1, userID: 1, responseObject: {time: 1615388569598, interval: 1, answers: ["It is good."], mood: 5, name: "User 1", context: "no ctx"}}
        });
        const r1 = prisma.response.create ({
            data: {responseID: 2, eventID: 1, userID: 2, responseObject: {time: 1615388569598, interval: 1, answers: ["It is boring."], mood: 1, name: "User 2", context: "no ctx"}}
        });
        const r2 = prisma.response.create ({
            data: {responseID: 3, eventID: 2, userID: 3, responseObject: {time: 1615388569598, interval: 1, answers: ["It is fine so far."], mood: 4, name: "User 3", context: "no ctx"}}
        });
        const r3 = prisma.response.create ({
            data: {responseID: 4, eventID: 2, userID: 3, responseObject: {time: 1615388569598, interval: 1, answers: ["This part is boring."], mood: 3, name: "User 3", context: "no ctx"}}
        });
        const transaction = await prisma.$transaction([e1,e2,e3,u1,u2,u3,r0,r1,r2,r3]);
    } catch(e) {
        throw e;
    } finally {
        prisma.$disconnect();
    }
};

exports.populate = populate;