import Analysis, { calculateMood } from '../Analysis.js';
const fetch = require('../../../api/node_modules/cross-fetch');
import Response from '../Response.js'
import Answer from '../Answer.js'

describe("Response class", () => {
    it("constructor and mood calculation", async () => {
        const newResponse = new Response(["It is bad"], Date.now(), 60, "Test Name", "Sitting in the last row", 1);
        expect(newResponse.answers).toEqual([new Answer("It is bad", 0)]);
        await Response.calculateMood(newResponse);
        expect(newResponse.mood).toBeGreaterThanOrEqual(-1);
        expect(newResponse.mood).toBeLessThanOrEqual(1);
    });
});

describe("Analysis class", () => {
    it("constructor", () => {
        const newAnalysis1 = new Analysis(10, 60, 5);
        const emptyArray = [];
        expect(newAnalysis1.moodArray).toEqual(emptyArray);
        expect(newAnalysis1.currentMood).toEqual(0);
        expect(newAnalysis1.selectedInterval).toEqual(5);
        expect(newAnalysis1.length).toEqual(60);
        expect(newAnalysis1.mostRecentResponse.size).toEqual(0);
    });
    it("calculates mood", async () => {
        const newResponse = new Response(["It is good"], Date.now(), 200, "k_t/zX65", "Sitting in the last row", 5);
        await Response.calculateMood(newResponse);
        const newAnalysis2 = new Analysis(10, 200, 5);
        newAnalysis2.mostRecentResponse.set("12345", newResponse);
        const mood = await Analysis.calculateMood(newAnalysis2);
        expect(mood).toBeGreaterThanOrEqual(-1);
        expect(mood).toBeLessThanOrEqual(1);
    });
});