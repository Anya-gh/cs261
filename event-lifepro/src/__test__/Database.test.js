const { PrismaClient } = require('../../../api/node_modules/@prisma/client');
import seed from '../../../api/seed';

test("Database", async () => {
    const prisma = new PrismaClient();
    try {
    const p = await seed.populate();
    const e1 = await prisma.event.findUnique({where: {eventID: 111}});
    expect(e1).toEqual({eventID: 111, eventObject: {name: 'Event 1', people: 2, interval: 0, length: 0, time: 0}, templateObject: {typeArray: ["open"], descriptionArray: ["How is the event?"]},
                        forumObject: {}, analysisObject: {currentInterval: 0, selectedInterval: 0, length: 0,}});
    const e2 = await prisma.event.findUnique({where: {eventID: 112}});
    expect(e2).toEqual({eventID: 112, eventObject: {name: 'Event 2', people: 1, interval: 0, length: 0, time: 0}, templateObject: {typeArray: ["open"], descriptionArray: ["How is the event?"]},
                        forumObject: {}, analysisObject: {currentInterval: 0, selectedInterval: 0, length: 0,}});
    const e3 = await prisma.event.findUnique({where: {eventID: 113}});
    expect(e3).toEqual({eventID: 113, eventObject: {name: 'Event 3', people: 0, interval: 0, length: 0, time: 0}, templateObject: {typeArray: ["open"], descriptionArray: ["How is the event?"]},
                        forumObject: {}, analysisObject: {currentInterval: 0, selectedInterval: 0, length: 0,}});
    const k1 = await prisma.key.findUnique({where: {keyID: 1111}});
    expect(k1).toEqual({keyID: 1111, eventID: 111, attKey: 21111, hostKey: 11111});
    const k2 = await prisma.key.findUnique({where: {keyID: 1112}});
    expect(k2).toEqual({keyID: 1112, eventID: 112, attKey: 21112, hostKey: 11112});
    const k3 = await prisma.key.findUnique({where: {keyID: 1113}});
    expect(k3).toEqual({keyID: 1113, eventID: 113, attKey: 21113, hostKey: 11113});
    const u1 = await prisma.user.findUnique({where: {userID: 11111}});
    expect(u1).toEqual({userID: 11111, eventID: 111, name: "User 1"});
    const u2 = await prisma.user.findUnique({where: {userID: 11112}});
    expect(u2).toEqual({userID: 11112, eventID: 111, name: "User 2"});
    const u3 = await prisma.user.findUnique({where: {userID: 11113}});
    expect(u3).toEqual({userID: 11113, eventID: 112, name: "User 3"});
    const r1 = await prisma.response.findUnique({where: {responseID: 111111}});
    expect(r1).toEqual({responseID: 111111, eventID: 111, userID: 11111, responseObject: {userID: 11111, time: "1210", answers: ["It is good"], mood: 5}});
    const r2 = await prisma.response.findUnique({where: {responseID: 111112}});
    expect(r2).toEqual({responseID: 111112, eventID: 111, userID: 11112, responseObject: {userID: 11112, time: "1150", answers: ["It is boring"], mood: 1}});
    const r3 = await prisma.response.findUnique({where: {responseID: 111113}});
    expect(r3).toEqual({responseID: 111113, eventID: 112, userID: 11113, responseObject: {userID: 11113, time: "0930", answers: ["I like it so far"], mood: 4}});
    const r4 = await prisma.response.findUnique({where: {responseID: 111114}});
    expect(r4).toEqual({responseID: 111114, eventID: 112, userID: 11113, responseObject: {userID: 11113, time: "0948", answers: ["This part is not interesting"], mood: 3}});
    } catch(e) {
        throw e;
    } finally {
        prisma.$disconnect();
    }
});