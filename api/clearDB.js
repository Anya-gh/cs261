const { PrismaClient } = require('@prisma/client');
const DBdeletion = require('./DBdeletion');
//Imports the PrismaClient constructor for @prismaclient node module

const prisma = new PrismaClient()
//Instantiate PrismaClient

async function main() {
    const deletion = await DBdeletion.deleteAllEvent();
};

main()
    .catch(e => {
        throw e
    }) // throw error if an error
    .finally(async () => {
        await prisma.$disconnect()
    }) //disconnect when script terminates