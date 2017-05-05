import { Presence } from 'phoenix';

import {
  CONNECT_STARTED,
  CONNECT_SUCCESS,
  CONNECT_FAILURE,
  PRESENCE_SYNCED,
  PRESENCE_DIFF
} from './actions';

const defaultState = {
  presence: {},
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

    default:
      return state;
  }
}
