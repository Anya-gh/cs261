const { PrismaClient } = require('@prisma/client');
const prisma = require('@prisma/client');
const express = require('express');
const router = express.Router();
const prismadb = new PrismaClient();
//const Tempbackend = require('../TempBackend.js');

const app = express()
app.use(express.json())

//---vvv REDUNDANT vvv---
/**uses the above async function to do the same task as the other GET/POST requests in one POST request
attendee username and attendee key is input to return userObject (create if required), eventObject,
templateObject and forumObject*/
//Now relies on Tempbackend to work. ensure that it is all setup before use.
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
        //previously, userRetrieve returned user, event, template, forum objects
        //if not exist create user in db
        if (usercheck == null) {
            //create user object function with name
            Tempbackend.createNewUser(username,Number(keycheck.eventID));
            usercheck = await userRetrieve(json, keycheck.eventID)
        }
        res.json(usercheck);
    }

})

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


// function that retrieves userID associated to user
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
            userID: true,
        },
    });
    return reqObject;
}

//GET eventID on checking a key, otherwise returns null
router.get('/key/:id', async (req, res) => {
    const { id } = req.params;
    let exist = false;
    const keycheck = await prismadb.key.findUnique({
        where: {
            keyID: Number(id),
        },
        select: {
            eventID: true,
        },
    })
    if (keycheck != null) {
        exist = true;
    }
    res.json({exist, keycheck}); //returns eventID to front end and whether key exists
});
//on front end side, it gets the response that the key code is valid
//then must execute the check user by passing the attendee name




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

//Relies on Tempbackend to work!!!!!!!!
router.post('/response', async (req,res) => {
    const {name, anonymous, eventID, answerArray} = req.body;
    let json = {name: name};
    let givenname = name;
    //namecheck, returning userID 
    var usercheck = await userRetrieve(json, Number(eventID));
    //if not exist create user in db
    if (usercheck == null) {
        //create user object function with name
        Tempbackend.createNewUser(name,Number(eventID));
        usercheck = await userRetrieve(json, Number(eventID));
    }
    if (anonymous = true) {
        givenname = "Anonymous";
    }
    Tempbackend.createNewResponse(Number(eventID), Number(usercheck), answerArray); 
    //add name attribute, where name is set to givenname.
    //may want to retrieve values as well as there is no way of knowing if successful
    res.json("success");
})

module.exports = router;
