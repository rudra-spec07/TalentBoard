import EventEmitter from 'events';

class ApplicationEvents extends EventEmitter {
  constructor() {
    super();
    this.EVENTS = {
      CREATED: 'ApplicationCreated',
      WITHDRAWN: 'ApplicationWithdrawn',
      STATUS_UPDATED: 'ApplicationStatusUpdated'
    };
  }

  emitCreated(application) {
    this.emit(this.EVENTS.CREATED, application);
    console.log(`[EVENT] ${this.EVENTS.CREATED}: Application ID ${application._id || application.id} created.`);
  }

  emitWithdrawn(application) {
    this.emit(this.EVENTS.WITHDRAWN, application);
    console.log(`[EVENT] ${this.EVENTS.WITHDRAWN}: Application ID ${application._id || application.id} withdrawn.`);
  }

  emitStatusUpdated(application) {
    this.emit(this.EVENTS.STATUS_UPDATED, application);
    console.log(`[EVENT] ${this.EVENTS.STATUS_UPDATED}: Application ID ${application._id || application.id} transitioned to ${application.status}.`);
  }
}

export default new ApplicationEvents();
