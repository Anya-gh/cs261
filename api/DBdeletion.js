const { PrismaClient } = require('@prisma/client')
//Imports the PrismaClient constructor for @prismaclient node module

//const prisma = new PrismaClient()
//Instantiate PrismaClient

/* 
In order to user make sure to do 
const DBdeletion = require('./Pathtofile/DBdeletion');
Each of the functions then would be
DBdeletion.function;
Also please notify if you want the functions to return what they are doing
*/

//deletes a specific event
async function deleteEvent(evID) {
    const prisma = new PrismaClient()
    try {
        const eventID = Number(evID);
        const relationdelete = prisma.event.update({
            where: {
                eventID: eventID,
            },
            data: {
                key: {
                    deleteMany: {},
                },
                response: {
                    deleteMany: {},
                },
            },
        })
        const userdelete = prisma.event.update({
            where: {
                eventID: eventID,
            },
            data: {
                user: {
                    deleteMany: {},
                },
            },
        })
        const eventdelete = prisma.event.deleteMany({
            where: {
                eventID: eventID,
            },
        })
        //to ensure the above is executed in order
        const transaction = await prisma.$transaction([relationdelete, userdelete, eventdelete]);
    } catch(e) {
        throw e;
    } finally {
        prisma.$disconnect();
    }
};

//deletes a specific user
async function deleteUser(userID) {
    const prisma = new PrismaClient()
    try {
        const relationdelete = prisma.user.update({
            where: {
                userID: userID,
            },
            data: {
                response: {
                    deleteMany: {},
                },
            },
        });
        const userdelete = prisma.user.deleteMany({
            where: {
                userID: userID,
            },
        });
        const transaction = await prisma.$transaction([relationdelete, userdelete]);
    } catch(e) {
        throw e;
    } finally {
        prisma.$disconnect();
    }
}

//since everything in DB relates to the Event. Delete all event deletes all in all tables
async function deleteAllEvent() {
    const prisma = new PrismaClient()
    try {
        const responsedelete = prisma.response.deleteMany({});
        const keydelete = prisma.key.deleteMany({});
        const userdelete = prisma.user.deleteMany({});
        const eventdelete = prisma.event.deleteMany({});
        const transaction = await prisma.$transaction([responsedelete, keydelete, userdelete, eventdelete]);
    } catch(e) {
        throw e;
    } finally {
        prisma.$disconnect();
    }
}

async function deleteAllUser() {
    const prisma = new PrismaClient()
    try {
        const responsedelete = prisma.response.deleteMany({});
        const userdelete = prisma.key.deleteMany({});
        const transaction = await prisma.$transaction([responsedelete, userdelete]);
    } catch(e) {
        throw e;
    } finally {
        prisma.$disconnect();
    }
}

exports.deleteEvent = deleteEvent;
exports.deleteUser = deleteUser;
exports.deleteAllUser = deleteAllUser;
exports.deleteAllEvent = deleteAllEvent;