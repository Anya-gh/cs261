const Answer = require('./Answer.js');
const Analysis = require('./Analysis.js');

class Response {
    
    
     /** Creates a response object. Takes event time information to calculate which interval response was made in
     *      
     * @param {string[]}    contentsArray   array of question answers
     * @param {Date}        eventStart      Start time of event as a Date
     * @param {integer}     eventInterval   interval in minutes
     * @param {string}      context         response context
     * @param {string}      name            name to be shown
     * @param {integer}     mood            selected mood from user between 0-10 
     */
    constructor(contentsArray, eventStart, eventInterval, name, context, mood) {
        this.time = Date.now();
        this.interval = Math.floor((this.time - eventStart) / (60000 * eventInterval));
        this.answers = []
        this.mood = mood;
        this.name = name;
        for (var i =0; i < contentsArray.length; i++){
            if (contentsArray[i]) {
                this.addQuestion(contentsArray[i], i);
            }
        }
        this.context = context;
            //console.log(answerArray[i].content);
            //console.log(JSON.stringify(sentAnalysis));
  
    }
    /** Adds questions to objects answer array
     * 
     * @param {string}      contents    content of answer
     * @param {*integer}    index       array index
     */
    addQuestion(contents, index){
        this.answers.push(new Answer(contents, index));
    }
    /** Calculates mood using sentiment analysis from an objects answers
     * 
     * @param {Response} responseObj Response object
     */
    static async calculateMood(responseObj){
        var totalMood = ((responseObj.mood - 5) / 5);
        var sentAnalysis;
        for (var i =0; i < responseObj.answers.length; i++){
            sentAnalysis = await Analysis.getSentAnalysis(responseObj.answers[i].content);
            totalMood += sentAnalysis.compound;
        }
        if (responseObj.answers) {
            responseObj.mood =  totalMood / (2 * responseObj.answers.length);
            return 
        }
        else{
            responseObj.mood = 0;
        }
    }
  }
  
  module.exports = Response;
