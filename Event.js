class Event {
  constructor({ session } = []) {
    this.session = session;
  }

  createEvent() {
    let event;
    let sessions = [];

    sessions.push(this.session);

    event = sessions;

    return event;
  }
}
