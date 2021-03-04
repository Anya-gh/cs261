const { PrismaClient } = require('@prisma/client');
var prisma = require('@prisma/client');
var express = require('express');
var router = express.Router();
var prismadb = new PrismaClient();

var app = express()
app.use(express.json())

//---vvv REDUNDANT vvv---
//GET eventID on checking a key, otherwise returns null
router.get('/key/:id', async (req, res) => {
    const { id } = req.params;
    const keycheck = await prismadb.key.findUnique({
        where: {
            keyID: Number(id),
        },
        select: {
            eventID: true,
        },
    })
    res.json(keycheck); //returns eventID to front end
});
//on front end side, it gets the response that the key code is valid
//then must execute the check user by passing the attendee name

// checks if a name provided exist, GET's userObject if so, otherwise null
router.get('/check/:username', async (req, res) => {
    const { username } = req.params;
    var json = { name: username };
    // ----- IMPORTANT-----
    // may need the change the above var json based on what the userObject contains
    // also the only query possible on json type is equal/not so format must be correct
    const usercheck = await prismadb.user.findFirst({
        where: {
            userObject: {
                equals: json,
            }
        },
        select: {
            userObject: true,
        },
    })
    res.json(usercheck);
})

// creates a new user in the database given a name and the associated eventID
router.post('/create', async(req, res) => {
    const { name, eventID } = req.body;
    const evint = parseInt(eventID);
    //create user object function with name
    const result = await prismadb.user.create({
        data: {
            eventID: evint,
            userObject: {  name: name }, // replace this with created user object
        }
    })
    res.json(result) 
    // result should be a separate const that hold userID associated event info
    // null otherwise
});
//---^^^ REDUNDANT ^^^---


// function that retrieves [user|event|forum|template] objects associated to user
async function userRetrieve(json, evID) {
    const reqObject = prismadb.user.findFirst({
        // find unique does not work when dealing with json
        where: {
            userObject: {
                equals: json,
            },
            eventID: evID,
        },
        select:{
            userObject: true,
            event: {
                select: {
                    eventObject: true,
                    templateObject: true,
                    forumObject: true,
                },
            },
        },
    });
    return reqObject;
}

/**uses the above async function to do the same task as the other GET/POST requests in one POST request
attendee username and attendee key is input to return userObject (create if required), eventObject,
templateObject and forumObject*/
router.post('/', async(req, res) => {
    const {username, attkey} = req.body;
    //keycheck function
    const intkey = parseInt(attkey);
    let json = {name: username};
    // ----- IMPORTANT-----
    // may need the change the above var json based on what the userObject contains
    // also the only query possible on json type is equal/not so format must be correct
    const keycheck = await prismadb.key.findUnique({
        where: {
            keyID: intkey,
        },
        select: {
            eventID: true,
        },
    });

    if (keycheck == null){
        res.json("The key you have entered does not exist");
    }else {
        //usernamecheck
        var usercheck = await userRetrieve(json, keycheck.eventID);
        //if not exist create user in db
        if (usercheck == null) {
            //create user object function with name
            const usercreate = await prismadb.user.create({
                data: {
                    eventID: keycheck.eventID,
                    userObject: json, // may need to change this if userObject is designed differently
                },
                //maybe include select to get the userobject   
            });
            usercheck = await userRetrieve(json, keycheck.eventID)
        }
        res.json(usercheck);
    }

})

//retrieves [event, template] objects given an event id
router.get('/feedback/:evID', async(req, res) => {
    const { evID } = req.params;
    const feedQuery = await prismadb.event.findUnique({
        where: {
            eventID: Number(evID),
        },
        select: {
            eventObject: true,
            templateObject: true,
        },
    })
    res.json(feedQuery);
});

module.exports = router;
