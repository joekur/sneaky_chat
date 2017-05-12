import { Socket, Presence } from 'phoenix';

export const CONNECT_STARTED = 'CONNECT_STARTED';
export const CONNECT_SUCCESS = 'CONNECT_SUCCESS';
export const CONNECT_FAILURE = 'CONNECT_FAILURE';

export const PRESENCE_SYNCED = 'PRESENCE_SYNCED';
export const PRESENCE_DIFF = 'PRESENCE_DIFF';

export const HISTORY_LOADED = 'HISTORY_LOADED';

export const MESSAGE_SENT = 'MESSAGE_SENT';
export const MESSAGE_SENT_ACKED = 'MESSAGE_SENT_ACKED';
export const NEW_MESSAGE = 'NEW_MESSAGE';

let socket, channel;

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

function historyLoaded(response) {
  return {
    type: HISTORY_LOADED,
    data: { response },
  };
}

function messageSent(message) {
  return {
    type: MESSAGE_SENT,
    data: { message },
  };
}

function messageSentAcked(response) {
  return {
    type: MESSAGE_SENT_ACKED,
    data: { clientTimestamp: response.client_timestamp },
  };
}

function newMessage(payload) {
  return {
    type: NEW_MESSAGE,
    data: { message: payload },
  };
}

function loadHistory(dispatch) {
  const headers = new Headers();
  headers.append('Authorization', `Bearer: ${authToken()}`)
  fetch('/api/history', { headers })
    .then((resp) => resp.json())
    .then((resp) =>
      dispatch(historyLoaded(resp))
    );
}

function authToken() {
  return document.querySelector('meta[name="guardian_token"]').getAttribute('content');
}

export function connectApp() {
  return (dispatch) => {
    dispatch(connectStarted());

    socket = new Socket('/socket', {});
    socket.connect();

    channel = socket.channel('room:lobby', { auth_token: authToken() });

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

    channel.on('new:message', (messageJson) => {
      dispatch(newMessage(messageJson));
    });

    loadHistory(dispatch);
  }
}

export function sendMessage(body) {
  return (dispatch, getState) => {
    const timestamp = moment.utc().toISOString();
    const message = {
      body,
      user: getState().userId,
      inserted_at: timestamp,
      id: `pending-${timestamp}`,
      pending: true,
    };
    dispatch(messageSent(message));

    channel.push('new:message', {
      body,
      client_timestamp: timestamp,
    }).receive('ok', (resp) => {
      dispatch(messageSentAcked(resp));
    });
  }
}
