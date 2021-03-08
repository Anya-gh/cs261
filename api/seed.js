const { PrismaClient } = require('@prisma/client');
const DBdeletion = require('./DBdeletion');
//Imports the PrismaClient constructor for @prismaclient node module

const prisma = new PrismaClient()
//Instantiate PrismaClient

async function populate() {
    //An async function to send queries to the database
    await DBdeletion.deleteAllEvent();
    // create events
    await prisma.event.create ({
        data: {eventID: 111, eventObject: {name: 'Event 1', people: 2, interval: 0, length: 0, time: 0}, templateObject: {typeArray: ["open"], descriptionArray: ["How is the event?"]},
                forumObject: {Post: "Cannot hear the speaker",}, analysisObject: {currentInterval: 0, selectedInterval: 0, length: 0,}
        }
    });
    await prisma.event.create ({
        data: {eventID: 112, eventObject: {name: 'Event 2', people: 1, interval: 0, length: 0, time: 0}, templateObject: {typeArray: ["open"], descriptionArray: ["How is the event?"]},
        forumObject: {Post: "Cannot hear the speaker",}, analysisObject: {currentInterval: 0, selectedInterval: 0, length: 0,}
        }
    });
    await prisma.event.create ({
        data: {eventID: 113, eventObject: {name: 'Event 3', people: 0, interval: 0, length: 0, time: 0}, templateObject: {typeArray: ["open"], descriptionArray: ["How is the event?"]},
        forumObject: {Post: "Cannot hear the speaker",}, analysisObject: {currentInterval: 0, selectedInterval: 0, length: 0,}
        }
    });
    //create keys
    await prisma.key.create ({
        data: {keyID: 1111, eventID: 111, keyObject: {attendeeKey: "attK 1", hostKey: "hK 1"}}
    });
    await prisma.key.create ({
        data: {keyID: 1112, eventID: 112, keyObject: {attendeeKey: "attK 2", hostKey: "hK 2"}}
    });
    await prisma.key.create ({
        data: {keyID: 1113, eventID: 113, keyObject: {attendeeKey: "attK 3", hostKey: "hK 3"}}
    });
    //create users
    await prisma.user.create ({
        data: {userID: 11111, eventID: 111, userObject: {name: "User 1"}}
    });
    await prisma.user.create ({
        data: {userID: 11112, eventID: 111, userObject: {name: "User 2"}}
    });
    await prisma.user.create ({
        data: {userID: 11113, eventID: 112, userObject: {name: "User 3"}}
    });
    //create responses
    await prisma.response.create ({
        data: {responeID: 111111, eventID: 111, userID: 11111, responseObject: {userID: 11111, time: "1210", answers: ["It is good"]}}
    });
    await prisma.response.create ({
        data: {responeID: 111112, eventID: 111, userID: 11112, responseObject: {userID: 11112, time: "1150", answers: ["It is boring"]}}
    });
    await prisma.response.create ({
        data: {responeID: 111113, eventID: 112, userID: 11113, responseObject: {userID: 11113, time: "0930", answers: ["I like it so far"]}}
    });
    await prisma.response.create ({
        data: {responeID: 111113, eventID: 112, userID: 11113, responseObject: {userID: 11113, time: "0945", answers: ["This part is not interesting"]}}
    });
}

exports.populate = populate;