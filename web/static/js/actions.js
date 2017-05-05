import { Socket, Presence } from 'phoenix';

export const CONNECT_STARTED = 'CONNECT_STARTED';
export const CONNECT_SUCCESS = 'CONNECT_SUCCESS';
export const CONNECT_FAILURE = 'CONNECT_FAILURE';

export const PRESENCE_SYNCED = 'PRESENCE_SYNCED';
export const PRESENCE_DIFF = 'PRESENCE_DIFF';

function connectStarted() {
  return {
    type: CONNECT_STARTED,
  };
}

function connectSuccess() {
  return {
    type: CONNECT_SUCCESS,
  };
}

function connectFailure() {
  return {
    type: CONNECT_FAILURE,
  };
}

function presenceSynced(presence) {
  return {
    type: PRESENCE_SYNCED,
    data: { presence },
  };
}

function presenceDiff(diff) {
  return {
    type: PRESENCE_DIFF,
    data: { diff },
  };
}

export function connectApp() {
  return (dispatch) => {
    dispatch(connectStarted());

    const socket = new Socket('/socket', {});
    socket.connect();

    const channel = socket.channel('room:lobby', {});

    channel.join()
      .receive('ok', (resp) => {
        dispatch(connectSuccess());
      })
      .receive('error', (resp) => {
        dispatch(connectFailure());
      });

    channel.on('presence_state', (presence) => {
      dispatch(presenceSynced(presence));
    });
    channel.on('presence_diff', (diff) => {
      dispatch(presenceDiff(diff));
    });
  }
}
