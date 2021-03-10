const { PrismaClient } = require('@prisma/client');
const DBdeletion = require('./DBdeletion');
//Imports the PrismaClient constructor for @prismaclient node module

const prisma = new PrismaClient()
//Instantiate PrismaClient

async function reset() {
    try {
        await DBdeletion.deleteAllEvent();
        console.log("deleted entries");
    } catch(e) {
        console.log(e.messege);
    } finally {
        console.log("finished");
    }
}

reset();

exports.reset = reset;