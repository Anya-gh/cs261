const { PrismaClient, Prisma } = require('@prisma/client');
import DBdeletion from './DBdeletion'
//Imports the PrismaClient constructor for @prismaclient node module
//Instantiate PrismaClient

const populate = async () => {
    const prisma = new PrismaClient();
    try {
        const d = await DBdeletion.deleteAllEvent();
        const e1 = prisma.event.create ({
            data: {eventID: 111, eventObject: {name: 'Event 1', people: 2, interval: 0, length: 0, time: 0}, 
                    templateObject: {typeArray: ["open"], descriptionArray: ["How is the event?"]}, forumObject: {},  analysisObject: {currentInterval: 0, selectedInterval: 0, length: 0,}
            }
        });
        const e2 = prisma.event.create ({
            data: {eventID: 112, eventObject: {name: 'Event 2', people: 1, interval: 0, length: 0, time: 0}, 
            templateObject: {typeArray: ["open"], descriptionArray: ["How is the event?"]}, forumObject: {},  analysisObject: {currentInterval: 0, selectedInterval: 0, length: 0,}
            }
        });
        const e3 = prisma.event.create ({
            data: {eventID: 113, eventObject: {name: 'Event 3', people: 0, interval: 0, length: 0, time: 0}, 
            templateObject: {typeArray: ["open"], descriptionArray: ["How is the event?"]}, forumObject: {},  analysisObject: {currentInterval: 0, selectedInterval: 0, length: 0,}
            }
        });
        //create keys
        const k1 = prisma.key.create ({
            data: {keyID: 1111, eventID: 111, keyObject: {attendeeKey: "attK 1", hostKey: "hK 1"}}
        });
        const k2 = prisma.key.create ({
            data: {keyID: 1112, eventID: 112, keyObject: {attendeeKey: "attK 2", hostKey: "hK 2"}}
        });
        const k3 = prisma.key.create ({
            data: {keyID: 1113, eventID: 113, keyObject: {attendeeKey: "attK 3", hostKey: "hK 3"}}
        });
        //create users
        const u1 = prisma.user.create ({
            data: {userID: 11111, eventID: 111, userObject: {name: "User 1"}}
        });
        const u2 = prisma.user.create ({
            data: {userID: 11112, eventID: 111, userObject: {name: "User 2"}}
        });
        const u3 = prisma.user.create ({
            data: {userID: 11113, eventID: 112, userObject: {name: "User 3"}}
        });
        //create responses
        const r0 = prisma.response.create ({
            data: {responseID: 111111, eventID: 111, userID: 11111, responseObject: {userID: 11111, time: "1210", answers: ["It is good"]}}
        });
        const r1 = prisma.response.create ({
            data: {responseID: 111112, eventID: 111, userID: 11112, responseObject: {userID: 11112, time: "1150", answers: ["It is boring"]}}
        });
        const r2 = prisma.response.create ({
            data: {responseID: 111113, eventID: 112, userID: 11113, responseObject: {userID: 11113, time: "0930", answers: ["I like it so far"]}}
        });
        const r3 = prisma.response.create ({
            data: {responseID: 111114, eventID: 112, userID: 11113, responseObject: {userID: 11113, time: "0948", answers: ["This part is not interesting"]}}
        });
        const transaction = await prisma.$transaction([e1,e2,e3,k1,k2,k3,u1,u2,u3,r0,r1,r2,r3]);
    } catch(e) {
        throw e;
    } finally {
        prisma.$disconnect();
    }
};

exports.populate = populate;