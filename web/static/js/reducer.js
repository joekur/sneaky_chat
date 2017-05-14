import { Presence } from 'phoenix';
import moment from 'moment';
import orm from './orm';

import {
  PRESENCE_SYNCED,
  PRESENCE_DIFF,
  TEAM_LOADED,
  MESSAGE_SENT,
  MESSAGE_SENT_ACKED,
  NEW_MESSAGE,
  CHANGE_ROOMS,
  ROOM_LOADED,
} from './actions';

const defaultState = {
  presence: {},
  userId: null,
  currentRoomId: null,
  ...orm.getEmptyState(),
};

export default function reducer(state = defaultState, action) {
  const session = orm.session(state);
  switch(action.type) {
    case PRESENCE_SYNCED:
      return {
        ...state,
        presence: Presence.syncState(
          state.presence,
          action.data.presence
        )
      };

    case PRESENCE_DIFF:
      return {
        ...state,
        presence: Presence.syncDiff(
          state.presence,
          action.data.diff
        )
      };

    case TEAM_LOADED:
      action.data.response.users.forEach(user =>
        session.User.create(user)
      );
      const rooms = action.data.response.rooms;
      rooms.forEach(room => {
        session.Room.create(room);
      });

      return {
        ...state,
        ...session.state,
        userId: action.data.response.user_id,
        currentRoomId: rooms[0].id,
      };

    case MESSAGE_SENT:
      session.Message.create(action.data.message);
      return { ...state, ...session.state };

    case MESSAGE_SENT_ACKED:
      const message = session.Message.get({
        inserted_at: action.data.clientTimestamp,
        pending: true,
      }).delete();
      return { ...state, ...session.state };

    case NEW_MESSAGE:
      session.Message.create(action.data.message);
      return { ...state, ...session.state };

    case CHANGE_ROOMS:
      return {
        ...state,
        currentRoomId: action.data.roomId,
      };

    case ROOM_LOADED:
      action.data.response.messages.forEach(message =>
        session.Message.create(message)
      );

      return {
        ...state,
        ...session.state,
      };

    default:
      return state;
  }
}
