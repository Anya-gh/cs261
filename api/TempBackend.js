const Event = require('../event-lifepro/src/Event.js');
const Template = require('../event-lifepro/src/Template.js');
const Forum = require('../event-lifepro/src/Forum.js');
const Analysis = require('../event-lifepro/src/Analysis.js');
const User = require('../event-lifepro/src/User.js');
const Response = require('../event-lifepro/src/Response.js');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

//createNewEvent("event name", "Joe", ["type1", "type2"], ["description1", "description2"])
//createNewUser("Joe", 1);
createNewResponse(1, 1, ["yes", "no"]);
function createNewEvent(name, people, typeArray, descriptionArray){
    var newEvent = new Event(name, people);
    var newTemplate = new Template(typeArray, descriptionArray)
    var newForum = new Forum()
    var newAnalysis = new Analysis()
    insertEvent(newEvent, newTemplate, newForum, newAnalysis)
}
async function insertEvent(event, template, forum, analysis) {
    const createEvent = await prisma.event.create({ 
        data: {
            eventID: 4,
            eventObject: event,
            templateObject: template,
            forumObject: forum,
            analysisObject: analysis
        },
     })
}
function createNewUser(name, eventID){
    var newUser = new User(name);
    insertUser(newUser, eventID);

}
async function insertUser(userObj, eventIDparam) {
    const createEvent = await prisma.user.create({ 
        data: {
            userID: 1,
            eventID: eventIDparam,
            userObject: userObj
        },
     })
}
function createNewResponse(eventID, userID, answerArray){
    var newResponse = new Response(userID, answerArray);
    insertResponse(eventID, userID, newResponse);
}
async function insertResponse(eventIDparam, userIDparam, responseObj){
    const createResponse = await prisma.response.create({
        data: {
            responseID: 3,
            eventID: eventIDparam,
            userID: userIDparam,
            responseObject: responseObj
        },
    })
}

function updateAnalysis(eventID, )