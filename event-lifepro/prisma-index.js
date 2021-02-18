const { PrismaClient } = require('@prisma/client')
//Imports the PrismaClient constructor for @prismaclient node module

const prisma = new PrismaClient()
//Instantiate PrismaClient

async function main() {
    //An async function to send queries to the database
    console.log(5 + 5);
    const event_example = await prisma.event.create ({
        data: {
            eventID: 1,
            eventObject: {
                name: 'A event',
            },
            templateObject: {
                Question: "How's the event",
            },
            forumObject: {
                Post: "Cannot hear the speaker",
            },
            analysisObject: {
                Mood: 1,
            },
        },
    })
    console.log(event_example) //outputs what was added to the terminal (It works!)
}

main()
    .catch(e => {
        throw e
    }) // throw error if an error
    .finally(async () => {
        await prisma.$disconnect()
    }) //disconnect when script terminates

