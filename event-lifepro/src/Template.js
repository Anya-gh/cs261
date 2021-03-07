var Question = require('./Question.js');

class Template {

    constructor(typeArray, descriptionArray) {
      this.questionArray = []
      for (var i = 0; i < typeArray.length; i++) {
        this.addQuestion(typeArray[i], descriptionArray[i]);
      }
    }
    addQuestion(type, description){
      this.questionArray.push(new Question(type, description));
    }
    removeQuestion(questionObj){
      const index = this.questionArray.indexOf(questionObj);
      if (index == -1){
        throw "No questions in array"
      }
      if (index > -1) {
        this.questionArray.splice(index, 1);
      }

    }
    editQuestion(questionObj, type, description){
      const index = this.questionArray.indexOf(questionObj);
      if (index == -1){
        throw "No questions in array"
      }
      if (index > -1) {
        this.questionArray[index] = new Question(type, description);
      }

    }
}
  
  
module.exports = Template;
