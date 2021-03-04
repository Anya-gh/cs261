class Event {
    constructor(name, people) {
        this.name = name;
        this.people = people;
    }
    
  }
class Session extends Event {
    constructor(name, people, interval, length, time){
      super(name, people);
      this.interval = interval;
      this.length = length;
      this.time = time;
    }
}
module.exports = Event;