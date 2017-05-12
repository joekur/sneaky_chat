import {fk, attr, Model, ORM} from 'redux-orm';

class Message extends Model {}
Message.modelName = 'Message';
Message.fields = {
  id: attr(),
  body: attr(),
  inserted_at: attr(),
  user: fk('User', 'messages'),
};

class User extends Model {}
User.modelName = 'User';
User.fields = {
  id: attr(),
  username: attr(),
  email: attr(),
}

const orm = new ORM();
orm.register(Message, User);

export default orm;
