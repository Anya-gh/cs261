const { PrismaClient } = require('@prisma/client');
const prisma = require('@prisma/client');
const express = require('express');
const router = express.Router();
const prismadb = new PrismaClient();
//const Tempbackend = require('../TempBackend.js');

const app = express();
app.use(express.json());

//host key check
//send all contents in event table
router.get('/key/:id', async (req, res) => {
    const { id } = req.params;
    let exist = false;
    const keycheck = await prismadb.key.findUnique({
        where: {
            keyID: Number(id),
        },
        select: {
            event: true,
        },
    })
    if (keycheck != null) {
        exist = true;
    }
    res.json({exist, keycheck}); //returns eventID and all related objects to front end
});

//retrieve [array of response] object given an event id
router.get('/review/:evID', async (req,res) => {
    const { evID } = req.params;
    const reviewObjs = await prismadb.event.findUnique ({
        where: {
            eventID: Number(evID),
        },
        select: {
            response: {
                select: {
                    responseID: true,
                    responseObject: true,
                },
            },
        },
    });
    res.json(reviewObjs);
});

//retrieve [array of user object and userID] given an event id
router.get('/reviewUser/:evID', async (req,res) => {
    const { evID } = req.params;
    const userinfo = await prismadb.event.findUnique ({
        where: {
            eventID: Number(evID),
        },
        select: {
            user: {
                select: {
                    userID: true,
                    userObject: true,
                },
            },
        },
    });
    res.json(userinfo);
})

// the below 2 functions rely on Tempbackend being imported for them to work so set that up first
router.post('/createEvent', async (req,res) => {
    const {eventName, peopleNum, typeArray, descriptionArray} = req.body;
    Tempbackend.createNewEvent(eventName, Number(peopleNum), typeArray, descriptionArray);
    //could add response that returns the added Event or specific objects.
    res.json("success");
})

router.post('/createUser', async (req,res) => {
    const {name, eventID} = req.body;
    Tempbackend.createNewUser(name,Number(eventID)); 
    //May want to check the Tempbackend.insertUser function as its UserID set to 1
    //could add a response which Queries for the newly created User or something else
    res.json("success");
})
//Both the above functions don't return anything, may want to ask Joe to change that to return some values.


/** REDUNDANT host create event 
// passed information: Title, Host name, event time (start/finish),
event type, analysis frequency, template type - should be after initial
creation? */
router.post('/create', async (req,res) => {
    const {title, name, starttime, finishtime, evtype, analfreq} = req.body;
    // maybe include template type above
    //event object created
    //default template object retrieved
    const templateObj = await prismadb.event.findMany({
        where: {
            eventID: 1,
        },
        select: {
            templateObject: true,
        },
    });
    //assuming eventID 1 will associate itself with the standard templates, all
    //standard templates will be returned.
    res.json(templateObj);
})

//deciding to skip the create template method outlined in event creation sequence
//instead combine create/edit into one where the template object sent by DB is
//manipulated on front end then sent back to DB along with Event|Forum|Analysis



module.exports = router;
