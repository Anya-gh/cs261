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
    console.log(event_example); //outputs what was added to the terminal (It works!)
    await keyexists(1); //key validation example that checks if key exists in db
    
    const key_example = await prisma.key.create ({
        data: {
            keyID: 1,
            eventID: 1,
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

