const { PrismaClient } = require('@prisma/client')
//Imports the PrismaClient constructor for @prismaclient node module

const prisma = new PrismaClient()
//Instantiate PrismaClient

async function main() {
    //An async function to send queries to the database
    console.log(5 + 5);
}

main()
    .catch(e => {
        throw e
    }) // throw error if an error
    .finally(async () => {
        await prisma.$disconnect()
    }) //disconnect when script terminates

