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
            keyObject: true,
        },
    })
    res.json(keycheck);
});

module.exports = router;
