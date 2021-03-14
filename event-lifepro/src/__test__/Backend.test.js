const { PrismaClient } = require('../../../api/node_modules/@prisma/client');
import { createNewResponse, createNewSession, createNewUser } from '../../../api/Backend';

test("Backend functionalities", async () => {
    const prisma = new PrismaClient();

    const newKeys = await createNewSession("Backend test event", 86, 14, 91, Date.now(), ["text", "choice"], [["Which topic would you like to hear more about?", []], [["Did you attend the pervious event?"], ["Yes", "No"]]]);
    expect(newKeys.hostKey).toBeGreaterThanOrEqual(104000000);
    expect(newKeys.hostKey).toBeLessThan(105000000);
    expect(newKeys.attKey).toBeGreaterThanOrEqual(97000000);
    expect(newKeys.attKey).toBeLessThan(98000000);
    const newEvent = await prisma.event.findUnique({where: {hostKey: newKeys.hostKey}});
    expect(newEvent).not.toBeNull();

    await createNewUser("Backend test name", newEvent.eventID);
    var newUser = await prisma.user.findMany({where: {eventID: newEvent.eventID, name: "Backend test name"}});
    newUser = newUser[newUser.length-1];
    expect(newUser).not.toBeNull();

    const origResponses = await prisma.response.findMany({where: {eventID: newEvent.eventID, userID: newUser.userID}});
    await createNewResponse(newEvent.eventID, newUser.userID, [{content: "Black holes", questionID: 0}, {content: "0", questionID: 1}], "Backend test name", "University student", 0.9);
    const newResponses = await prisma.response.findMany({where: {eventID: newEvent.eventID, userID: newUser.userID}});
    expect(newResponses.length).toEqual(origResponses.length+1);
    
    await prisma.$disconnect();
});