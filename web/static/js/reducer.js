import { Presence } from 'phoenix';
import moment from 'moment';
import orm from './orm';

import {
  CONNECT_STARTED,
  CONNECT_SUCCESS,
  CONNECT_FAILURE,
  PRESENCE_SYNCED,
  PRESENCE_DIFF,
  HISTORY_LOADED,
  MESSAGE_SENT,
} from './actions';

const defaultState = {
  presence: {},
  isConnected: false,
  isConnectError: false,
  ...orm.getEmptyState(),
};

export default function reducer(state = defaultState, action) {
  const session = orm.session(state);
  switch(action.type) {
    case CONNECT_STARTED:
      console.log('connect started');
      return { ...state, isConnected: false };

    case CONNECT_SUCCESS:
      return { ...state, isConnected: true };

    case CONNECT_FAILURE:
      return {
        ...state,
        isConnected: false,
        isConnectError: true,
      };

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

    case HISTORY_LOADED:
      action.data.response.messages.forEach(message =>
        session.Message.create(message)
      );
      action.data.response.users.forEach(user =>
        session.User.create(user)
      );
      return {
        ...state,
        ...session.state,
      };

    case MESSAGE_SENT:
      session.Message.create({
        user_id: 1, // TODO make dynamic
        body: action.data.body,
        inserted_at: moment.utc().toString(),
      });

      return {
        ...state,
        ...session.state,
      };

    default:
      return state;
  }
}
