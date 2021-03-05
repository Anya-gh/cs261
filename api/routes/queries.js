const { PrismaClient } = require('@prisma/client');
var prisma = require('@prisma/client');
var express = require('express');
var router = express.Router();
var prismadb = new PrismaClient();

var app = express();
app.use(express.json());

//this file contains functions to individually query for an object, given
//an event id

//cannot make general function as you cannot pass which field you want to select
//into select. Only possible method is retrieving all fields and then the response
//being eventcheck.object

router.get('/event/:evID', async (req, res) => {
    const { evID } = req.params;
    const eventcheck = await prismadb.event.findUnique({
        where: {
            eventID: Number(evID),
        },
        select: {
            eventObject: true,
        },
    });
    res.json(eventcheck.eventObject)
});

router.get('/template/:evID', async (req, res) => {
    const { evID } = req.params;
    const eventcheck = await prismadb.event.findUnique({
        where: {
            eventID: Number(evID),
        },
        select: {
            templateObject: true,
        },
    });
    res.json(eventcheck.templateObject)
});

router.get('/forum/:evID', async (req, res) => {
    const { evID } = req.params;
    const eventcheck = await prismadb.event.findUnique({
        where: {
            eventID: Number(evID),
        },
        select: {
            forumObject: true,
        },
    });
    res.json(eventcheck.forumObject)
});

router.get('/analysis/:evID', async (req, res) => {
    const { evID } = req.params;
    const eventcheck = await prismadb.event.findUnique({
        where: {
            eventID: Number(evID),
        },
        select: {
            analysisObject: true,
        },
    });
    res.json(eventcheck.analysisObject)
});

router.get('/feedback/:evID', async (req, res) => {
    const { evID } = req.params;
    const eventcheck = await prismadb.event.findMany({
        where: {
            eventID: Number(evID),
        },
        select: {
            response: {
                select: {
                    responseObject: true,
                },
            },
        },
    });
    res.json(eventcheck.responseObject)
});

module.exports = router;