const { PrismaClient } = require('@prisma/client');
var prisma = require('@prisma/client');
var express = require('express');
var router = express.Router();
var prismadb = new PrismaClient();

var app = express()
app.use(express.json())

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
    var json = { name: username }
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


//might put all the above into a single function. NOT WORKING:
router.post('/', async(req, res) => {
    const {name, attkey} = req.body
    //keycheck function
    //usernamecheck
    //if not exist create user in db
    //GET [user|event|forum|template] associated to eventID
})

module.exports = router;
