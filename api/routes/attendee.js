const { PrismaClient } = require('@prisma/client');
var prisma = require('@prisma/client');
var express = require('express');
var router = express.Router();
var prismadb = new PrismaClient();

var app = express()
app.use(express.json())
/** async function keyexists(evID) {
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
} */


/* GET users listing. */
// default route, won't be using this in final product
// use this for testing
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
//then must execute the create user by passing the attendee name and eventID

router.post('/create', async(req, res) => {
    const { name, eventID } = req.body;
    const evint = parseInt(eventID);
    console.log(evint);
    console.log(eventID);
    //create user object function with name
    const result = await prismadb.user.create({
        data: {
            eventID: evint,
            userObject: {  name: name }, // replace this with created user object
        }
    })
    res.json(result) // result should be a separate const that hold userID associated event info
});

module.exports = router;
