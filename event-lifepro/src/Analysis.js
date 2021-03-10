const fetch = require('../../api/node_modules/cross-fetch');
class Analysis {
  /**
   * 
   * @param {integer} people            number of people attending event
   * @param {integer} length            length of event in minutes
   * @param {integer} selectedInterval  analysis interval
   */
  constructor(people, length, selectedInterval) {
    this.moodArray = [];
    this.currentMood = 0;
    this.currentInterval = 0;
    this.selectedInterval = selectedInterval;
    this.length = length
    this.mostRecentResponse = new Map()
    //this.mostRecentResponse.set(1, "test")
  }
  /** API call to retrieve sentiment analysis
   * 
   * @param {string} text text to be analysed
   */
  static async getSentAnalysis(text) {
    const analysisResponse = await fetch("http://localhost:5000/analysis/" + text);
    const analysisData = await analysisResponse.json();
    return analysisData;
  }
  /** Iterates through the analysis mostRecentResponse map and totals the mood attribute then computes the average
   * 
   * @param {Analysis} analysisObj Analysis object
   */
  static async calculateMood(analysisObj) {
    var responseObj;
    var totalMood = 0
    for (const key of analysisObj.mostRecentResponse.keys()) {
      responseObj = analysisObj.mostRecentResponse.get(key);
      totalMood += responseObj.mood;
    }
    var totalResponses = 0;
    if (responseObj && responseObj.answers) {
      totalResponses = analysisObj.mostRecentResponse.size;
      return totalMood / totalResponses;
    } else {
      return 0;
    }


  }
  /** Calculates the average mood from the most recent responses
   *  then adds that mood to the mood array
   *  
   * Pump explained
   * mood array is only updated when a new response is made
   * therefore if there are no responses made in an interval there would be no mood
   * however this interval would have the same mood as the interval before
   * therefore this calculates the mood and fills the gaps in the array until the n-1 interval where n is current interval
   * @param {Analysis} analysisObj Analysis object
   */
  static async updateMood(analysisObj) {
    var averageMood = await Analysis.calculateMood(analysisObj);
    console.log("anal object length", analysisObj.moodArray.length);
    console.log("current interval", analysisObj.currentInterval);
    console.log("pump ", analysisObj.moodArray.length);
    console.log("CI ", analysisObj.currentInterval);


    var pump = analysisObj.moodArray.length;
    for (pump; pump < analysisObj.currentInterval; pump++) {
      analysisObj.moodArray.push(averageMood)
    }
    console.log(JSON.stringify(analysisObj.moodArray));

  }
  /** updates Analysis mood and mostRecentResponse attributes
   * if response is in a new interval, may have to fill in gaps so calls updateMood
   * adds the response to the mostRecentResponse datastrucure
   * sets the current mood to include the newest response
   * 
   * @param {Analysis}  analysisObj   analysis object
   * @param {integer}   userID        userID
   * @param {Response}  responseObj   response object
   */
  static async updateResponses(analysisObj, userID, responseObj) {
    var userIDStr = userID.toString();
    //console.log("UserID converted to string");
    //console.log(userIDStr);
    if (responseObj.interval > analysisObj.currentInterval) {
      analysisObj.currentInterval = responseObj.interval;
      await Analysis.updateMood(analysisObj);
    }

    if (analysisObj.mostRecentResponse.has(userIDStr)) {
      analysisObj.mostRecentResponse.delete(userIDStr);
    }
    analysisObj.mostRecentResponse.set(userIDStr, responseObj);
    analysisObj.currentMood = await Analysis.calculateMood(analysisObj);
    //console.log("Has userID been added to the mrr");
    //console.log(analysisObj.mostRecentResponse.entries());

  }
  /** Converts a freshly retrieved analysis object from the database
   * prisma stores the analysis.mostRecentResponse as a object but these methods require a map
   * this converts this object back into a map
   * 
   * @param {Analysis} analysisObj analysis object
   */
  static async convertObjectToMap(analysisObj) {
    if (analysisObj.mostRecentResponse) {
      const newMap = new Map(Object.entries(analysisObj.mostRecentResponse));
      //console.log("object to map, resulting map");
      //console.log(newMap.entries());
      analysisObj.mostRecentResponse = newMap;
    } else {
      analysisObj.mostRecentResponse = new Map();

    }

  }
  /** Converts a the analysis map into an object for storing
   * 
   * @param {Analysis} analysisObj analysis object
   */
  static async convertMapToObject(analysisObj) {
    if (analysisObj.mostRecentResponse) {
      const obj = Object.fromEntries(analysisObj.mostRecentResponse);
      //console.log("map to object, resulting object");
      //console.log(JSON.stringify(obj));
      analysisObj.mostRecentResponse = obj;
    } else {
      analysisObj.mostRecentResponse = new Object();
    }



  }
}

module.exports = Analysis;
