import { Presence } from 'phoenix';
import moment from 'moment';

import {
  CONNECT_STARTED,
  CONNECT_SUCCESS,
  CONNECT_FAILURE,
  PRESENCE_SYNCED,
  PRESENCE_DIFF,
  HISTORY_LOADED,
  MESSAGE_SENT
} from './actions';

const defaultState = {
  presence: {},
  messages: [],
  users: [],
  isConnected: false,
  isConnectError: false,
};

export default function reducer(state = defaultState, action) {
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
      return {
        ...state,
        messages: action.data.response.messages,
        users: action.data.response.users,
      };

    case MESSAGE_SENT:
      return {
        ...state,
        messages: [
          ...state.messages,
          {
            user_id: 1, // TODO make dynamic
            body: action.data.body,
            inserted_at: moment.utc().toString(),
          }
        ]
      };

    default:
      return state;
  }
}
