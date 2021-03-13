var Template = require('../Template.js');
var Question = require('../Question.js');

describe("Template class", () => {
    it("Question class works", () => {
        const newQuestion = new Question("open", "How is the event?");
        expect(newQuestion.type).toBe("open");
        expect(newQuestion.description).toBe("How is the event?");
    });
    const Q1 = new Question("open", "How is the event?");
    const Q2 = new Question("select", "Can you hear the speaker?");
    const Q3 =  new Question("open", "Which part was your favourite?");
    it("constructor + addQuestion", () => {
        const newTemplate1 = new Template(["open", "select", "open"], ["How is the event?", "Can you hear the speaker?", "Which part was your favourite?"]);
        expect(newTemplate1.questionArray).toEqual([Q1, Q2, Q3]);
        const emptyTemplate1 = new Template([], []);
        expect(emptyTemplate1.questionArray).toEqual([]);
    
    });
    it("removeQuestion", () => {
        const newTemplate2 = new Template(["open", "open"], ["How is the event?", "Which part was your favourite?"]);
        newTemplate2.removeQuestion(newTemplate2.questionArray[0]);
        expect(newTemplate2.questionArray).toEqual([Q3]);
        newTemplate2.removeQuestion(newTemplate2.questionArray[0]);
        expect(newTemplate2.questionArray).toEqual([]);
        //excpect(newTemplate2.removeQuestion(Q2).catch(e => {return e.name})).toEqual("No questions in array");
    });
    it("editQuestion", () => {
        const newTemplate3 = new Template(["open", "select", "open"], ["How is the event?", "Can you hear the speaker?", "Which part was your favourite?"]);
        newTemplate3.editQuestion(newTemplate3.questionArray[0], "select", "Can you see the blackboard?");
        expect(newTemplate3.questionArray).toEqual([new Question("select", "Can you see the blackboard?"), Q2, Q3]);
        const emptyTemplate2 = new Template([], []);
        //excpect(emptyTemplate2.editQuestion(Q2, "select", "Is the speaker too fast?").catch(e => {return e.name})).toEqual("No questions in array");
    });
  });
  