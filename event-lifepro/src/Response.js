const Answer = require('./Answer.js');

class Response {
    constructor(userID, contentsArray) {
        this.userID = userID;
        this.time = Date.now();
        this.answers = []
        for (var i =0; i < contentsArray.length; i++){
            this.addQuestion(contentsArray[i], i);
        }
    }
    addQuestion(contents, index){
        this.answers.push(new Answer(contents, index));
    }
  }
  
  module.exports = Response;
