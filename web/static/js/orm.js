import { fk, many, attr, Model, ORM } from 'redux-orm';

import moment from 'moment';

class Message extends Model {
  get timestamp() {
    const localTime = this.parsedInsertedAt.local();
    return localTime.format('h:mma');
  }

  get parsedInsertedAt() {
    return moment.utc(this.inserted_at);
  }

  isGroupableWith(message) {
    return this.user.id === message.user.id &&
      this.parsedInsertedAt.subtract(10, 'minute').isBefore(message.parsedInsertedAt);
  }
}
Message.modelName = 'Message';
Message.fields = {
  id: attr(),
  body: attr(),
  inserted_at: attr(),
  user: fk('User'),
  room: fk('Room', 'messages'),
};

class User extends Model {}
User.modelName = 'User';
User.fields = {
  id: attr(),
  username: attr(),
  email: attr(),
};

class Room extends Model {}
Room.modelName = 'Room';
Room.fields = {
  id: attr(),
  name: attr(),
};

const orm = new ORM();
orm.register(Message, User, Room);

export default orm;
