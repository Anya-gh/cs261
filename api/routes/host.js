const { PrismaClient } = require('@prisma/client');
var prisma = require('@prisma/client');
var express = require('express');
var router = express.Router();
var prismadb = new PrismaClient();

var app = express();
app.use(express.json());

//host key check
//send all contents in event table
router.get('/key/:id', async (req, res) => {
    const { id } = req.params;
    const keycheck = await prismadb.key.findUnique({
        where: {
            keyID: Number(id),
        },
        select: {
            event: true,
        },
    })
    res.json(keycheck); //returns eventID to front end
});

/** host create event
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
