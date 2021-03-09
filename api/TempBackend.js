const Session = require('../event-lifepro/src/Session.js');
const Event = require('../event-lifepro/src/Event.js');

const Template = require('../event-lifepro/src/Template.js');
const Forum = require('../event-lifepro/src/Forum.js');
const Analysis = require('../event-lifepro/src/Analysis.js');
const User = require('../event-lifepro/src/User.js');
const Response = require('../event-lifepro/src/Response.js');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


//createNewSession("event name", 1000, 10, 60, Date.now(), ["type1", "type2"], ["description1", "description2"]);
//createNewUser("Joe", 35);
//createNewUser("John", 35);
//createNewUser("Jack", 35);

//createNewResponse({}, 35, 33, ["wow that is really good", "wow good very good amazing fantastic"], "idk context i guess");
//createNewResponse({}, 35, 35, ["very bad i don't like", "terrible it sucks"], "idk context i guess");
//createNewResponse({}, 35, 35, ["okay pretty meh", "quite good"], "idk context i guess");
//getAnalysisObject(35);

/** Could be used to create default templates - probably defunct now
 * Would create empty event records that only contain template information
 * 
 * @param {string[]} typeArray          array for question type
 * @param {string[]} descriptionArray   array for actual question
 */
async function createDefaultTemplates(typeArray, descriptionArray) {
    var newEvent = new Event();
    var newTemplate = new Template(typeArray, descriptionArray)
    var newForum = new Forum()
    var newAnalysis = new Analysis()
    await insertEvent(newEvent, newTemplate, newForum, newAnalysis)
}
/** Creates new session and adds to database
 * 
 * @param {string}      eventname           Name of event
 * @param {integer}     people              number of people attending
 * @param {integer}     interval            analysis interval in minutes
 * @param {integer}     length              length of event in minutes
 * @param {Date}        time                start time of event
 * @param {string[]}    typeArray           array of question types
 * @param {string[]}    descriptionArray    array of actual questions
 */
async function createNewSession(eventname, people, interval, length, time, typeArray, descriptionArray) {
    var newEvent = new Session(eventname, people, interval, length, time);
    var newTemplate = new Template(typeArray, descriptionArray)
    var newForum = new Forum()
    var newAnalysis = new Analysis(people, length, interval)


    await insertEvent(newEvent, newTemplate, newForum, newAnalysis)
}
/** Inserts event details into database
 * 
 * @param {Event}       event       eventObj to be stored
 * @param {Template}    template    templateObj to be stored
 * @param {Forum}       forum       forumObj to be stored
 * @param {Analysis}    analysis    analysisObj to be stored
 */
async function insertEvent(event, template, forum, analysis) {
    const createEvent = await prisma.event.create({
        data: {
            eventObject: event,
            templateObject: template,
            forumObject: forum,
            analysisObject: analysis
        },
    })
}
/** Creates and inserts user into database
 * 
 * @param {string}  name        user name
 * @param {integer} eventID     eventID 
 */
async function createNewUser(name, eventID) {
    var newUser = new User(name);
    await insertUser(newUser, eventID);

}
/** Inserts a user object into database
 * 
 * @param {User}    userObj         userObj to be stored
 * @param {integer} eventIDparam    associated eventID    
 */
async function insertUser(userObj, eventIDparam) {
    const createEvent = await prisma.user.create({
        data: {
            eventID: eventIDparam,
            userObject: userObj
        },
    })
}
/** Creates a response object, calculates mood from that object. Checks to see if that user has submitted any other
 * responses for the same event. If user has userEventResponses, one written in same interval is overwritten, else
 * new response is added to database. Also updates analysis object to update mood
 * 
 * @param {integer}     eventID         eventID of response
 * @param {integer}     userID          userID of response
 * @param {string[]}    answerArray     users answers to questions
 * @param {string}      context         context to answers
 */
async function createNewResponse(eventID, userID, answerArray, context) {

    var eventObj = await getEventObject(eventID);
    var analysisObj = await getAnalysisObject(eventID);

    //console.log("CNR MMR START")
    //console.log(analysisObj.mostRecentResponse.entries());

    var newResponseObj = new Response(answerArray, eventObj.time, eventObj.interval, context);
    await Response.calculateMood(newResponseObj);
    userEventResponses = await findUserEventResponses(eventID, userID);
    newResponseID = -1;
    if (userEventResponses) {
        for (var i = 0; i < userEventResponses.length; i++) {
            oldResponseObj = userEventResponses[i].responseObject
            if (newResponseObj.interval == oldResponseObj.interval) {
                newResponseID = userEventResponses[i].responseID;
            }
        }
    }
    if (newResponseID == -1) {
        await insertResponse(eventID, userID, newResponseObj);
    } else {
        await updateResponse(eventID, userID, newResponseID, newResponseObj);
    }
    await Analysis.updateResponses(analysisObj, userID, newResponseObj);
    //console.log("CNR MMR FINAL")
    //console.log(analysisObj.mostRecentResponse.entries());
    await updateAnalysisObject(eventID, analysisObj);

}
/** finds responses matching user and eventID
 * 
 * @param {integer} eventIDparam    eventID 
 * @param {integer} userIDparam     userID
 */
async function findUserEventResponses(eventIDparam, userIDparam) {
    const userEventResponses = await prisma.response.findMany({
        where: {
            eventID: eventIDparam,
            userID: userIDparam
        },
    })
    return userEventResponses;
}
/** Inserts response into database
 * 
 * @param {integer}     eventIDparam    eventID      
 * @param {integer}     userIDparam     userID
 * @param {Response}    responseObj     response object
 */
async function insertResponse(eventIDparam, userIDparam, responseObj) {
    const createResponse = await prisma.response.create({
        data: {
            eventID: eventIDparam,
            userID: userIDparam,
            responseObject: responseObj
        },
    })
}
/** Updates a pre-existing response record
 * 
 * @param {integer}     eventIDparam        eventID
 * @param {integer}     userIDparam         userID
 * @param {integer}     responseIDparam     responseID
 * @param {Response}    responseObj         response object
 */
async function updateResponse(eventIDparam, userIDparam, responseIDparam, responseObj) {
    const createResponse = await prisma.response.update({
        where: { responseID: responseIDparam },
        data: {
            responseObject: responseObj
        },
    })
}
/** Updates analysis object in a pre-existing event record 
 * 
 * @param {integer}     eventIDparam    eventID
 * @param {Analysis}    analysisObj     analysis object
 */
async function updateAnalysisObject(eventIDparam, analysisObj) {
    await Analysis.convertMapToObject(analysisObj);
    //console.log("UAO MMR OBJ CONV")
    //console.log(JSON.stringify(analysisObj.mostRecentResponse))
    const createResponse = await prisma.event.update({
        where: { eventID: eventIDparam },
        data: {
            analysisObject: analysisObj
        },
    })
}
/** Retrieves event object from a specific ID
 * 
 * @param {integer} eventIDparam eventID
 */
async function getEventObject(eventIDparam) {
    const eventObj = await prisma.event.findUnique({
        where: {
            eventID: eventIDparam
        },
        select: {
            eventObject: true
        }
    })
    return eventObj.eventObject;
}
/** Retrieves analysis object from a specific ID.
 * Due to way analysis object is stored by prisma, datastructures must be converted back
 * in this case a generic object is converted back into a map
 * 
 * @param {integer} eventIDparam eventID
 */
async function getAnalysisObject(eventIDparam) {
    const eventObj = await prisma.event.findUnique({
        where: {
            eventID: eventIDparam
        },
        select: {
            analysisObject: true
        }
    })
    analysisObj = eventObj.analysisObject;
    console.log(JSON.stringify(analysisObj));

    await Analysis.convertObjectToMap(analysisObj);


    return analysisObj;
}

