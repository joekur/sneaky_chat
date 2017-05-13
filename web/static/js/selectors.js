import orm from './orm';

function currentRoom(state) {
  const session = orm.session(state);

  if (session.Room.hasId(state.currentRoomId)) {
    return session.Room.withId(state.currentRoomId);
  }

  return null;
}

export default {
  currentRoom,
};
