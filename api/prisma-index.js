const { PrismaClient } = require('@prisma/client')
//Imports the PrismaClient constructor for @prismaclient node module

const prisma = new PrismaClient()
//Instantiate PrismaClient

async function keyexists(evID) {
    //function to check if a exists
    const keycheck = await prisma.event.findUnique({
        where: {
            eventID: evID,
        }
    })
    if (keycheck) {
        console.log(1);
    } else {
        console.log(2);
    }
}

async function main() {
    //An async function to send queries to the database
    await prisma.event.deleteMany({}); //clears the db to avoid hitting unique constraint errors
    const event_example = await prisma.event.create ({
        data: {
            eventID: 1111,
            eventObject: {
                name: 'Event_1',
                people: 5,
            },
            templateObject: {
                typeArray: ["open"],
                descriptionArray: ["How is the event?"],
            },
            forumObject: {
                Post: "Cannot hear the speaker",
            },
            analysisObject: {
                currentInterval: 0,
                selectedInterval: "<an interval>",
                length: "<a lenght>",
            },
        },
    })
    console.log(event_example); //outputs what was added to the terminal (It works!)
    await keyexists(1111); //key validation example that checks if key exists in db

    const key_example = await prisma.key.create ({
        data: {
            keyID: 1111,
            eventID: 1111,
            keyObject: {
                name: 'A key object',
            },
        },
    })
}

main()
    .catch(e => {
        throw e
    }) // throw error if an error
    .finally(async () => {
        await prisma.$disconnect()
    }) //disconnect when script terminates

