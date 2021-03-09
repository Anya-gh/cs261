const { PrismaClient } = require('@prisma/client');
const DBdeletion = require('./DBdeletion');
//Imports the PrismaClient constructor for @prismaclient node module

const prisma = new PrismaClient()
//Instantiate PrismaClient

async function populate2() {
    /*const e1 = prisma.event.create ({
        data: {eventID: 1114, eventObject: {name: 'Event 1', people: 2, interval: 0, length: 0, time: 0}, templateObject: {typeArray: ["open"], descriptionArray: ["How is the event?"]},
                forumObject: {Post: "Cannot hear the speaker",}, analysisObject: {currentInterval: 0, selectedInterval: 0, length: 0,}
        }
    });*/
    try {
        await DBdeletion.deleteAllEvent();
        console.log("deleted entries");
    } catch(e) {
        console.log(e.messege);
    } finally {
        console.log("finished");
    }
}

populate2();

exports.populate2 = populate2;