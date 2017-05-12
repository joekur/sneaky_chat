import { Socket, Presence } from 'phoenix';

export const CONNECT_STARTED = 'CONNECT_STARTED';
export const CONNECT_SUCCESS = 'CONNECT_SUCCESS';
export const CONNECT_FAILURE = 'CONNECT_FAILURE';

export const PRESENCE_SYNCED = 'PRESENCE_SYNCED';
export const PRESENCE_DIFF = 'PRESENCE_DIFF';

export const HISTORY_LOADED = 'HISTORY_LOADED';

export const MESSAGE_SENT = 'MESSAGE_SENT';
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

function messageSent(msg) {
  return {
    type: MESSAGE_SENT,
    data: { body: msg },
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

export function sendMessage(msg) {
  return (dispatch) => {
    dispatch(messageSent(msg));

    channel.push('new:message', { body: msg })
      .receive('ok', () => {});
  }
}
