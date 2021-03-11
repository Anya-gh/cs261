const { PrismaClient } = require('@prisma/client');
const prisma = require('@prisma/client');
const express = require('express');
const router = express.Router();
const prismadb = new PrismaClient();
const backend = require('../Backend.js');
const bodyParser = require('body-parser');

const app = express();
app.use(express.json());
app.use(bodyParser.json());

//---vvv REDUNDANT vvv---
/**uses the above async function to do the same task as the other GET/POST requests in one POST request
attendee username and attendee key is input to return userObject (create if required), eventObject,
templateObject and forumObject*/
//Now relies on Tempbackend to work. ensure that it is all setup before use.
router.post('/', async(req, res) => {
    const {username, attkey} = req.body;
    //keycheck function
    const intkey = parseInt(attkey);
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
        var usercheck = await userRetrieve(username, keycheck.eventID);
        //previously, userRetrieve returned user, event, template, forum objects
        //if not exist create user in db
        if (usercheck == null) {
            //create user object function with name
            backend.createNewUser(username,Number(keycheck.eventID));
            usercheck = await userRetrieve(username, keycheck.eventID)
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
async function userRetrieve(name, evID) {
    const reqObject = prismadb.user.findFirst({
        // find unique does not work when dealing with json
        where: {
            name: name,
            eventID: evID,
        },
        select:{
            userID: true,
        },
    });
    return reqObject;
}

//attendee key check
router.get('/key/:id', async (req, res) => {
    const { id } = req.params;
    await backend.validateKey("attendee", id)
    .then((value) => res.json(value))  //whether the key exists
});
//on front end side, it gets the response that the key code is valid
//then must execute the check user by passing the attendee name

//retrieves [event, template] objects given an event id
router.get('/feedback/:key', async(req, res) => {
    const { key } = req.params;
    const eventObject = await prismadb.event.findUnique({
        where: {
            attKey: Number(key),
        },
        select: {
            eventObject: true,
            templateObject: true,
            eventID: true,
        },
    })
    res.json(eventObject);
});

router.post('/response', async (req,res) => {
    const {name, anonymous, eventID, answerArray, context, mood} = req.body;
    let givenName = name;
    //namecheck, returning userID 
    var usercheck = await userRetrieve(name, Number(eventID));
    //if not exist create user in db
    if (usercheck == null) {
        //create user object function with name
        await backend.createNewUser(name,Number(eventID));
        usercheck = await userRetrieve(name, Number(eventID));
    }
    if (anonymous === true) {
        givenName = "Anonymous";
    }
    backend.createNewResponse(Number(eventID), Number(usercheck.userID), answerArray, givenName, context, mood); 
    //add name attribute, where name is set to givenname.
    //may want to retrieve values as well as there is no way of knowing if successful
    res.json("success");
})

module.exports = router;
