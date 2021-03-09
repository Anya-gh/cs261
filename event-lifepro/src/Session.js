const Event = require('./Event.js');

class Session extends Event {
    constructor(eventname, people, interval, length, time){
      super(eventname, people);
      this.interval = interval;
      this.length = length;
      this.time = time;      
      

    }
}

module.exports = Session;