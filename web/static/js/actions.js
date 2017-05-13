import { Presence } from 'phoenix';
import SocketManager from './socket_manager';
import { authToken } from './auth';

export const PRESENCE_SYNCED = 'PRESENCE_SYNCED';
export const PRESENCE_DIFF = 'PRESENCE_DIFF';

export const HISTORY_LOADED = 'HISTORY_LOADED';

export const MESSAGE_SENT = 'MESSAGE_SENT';
export const MESSAGE_SENT_ACKED = 'MESSAGE_SENT_ACKED';
export const NEW_MESSAGE = 'NEW_MESSAGE';

export const CHANGE_ROOMS = 'CHANGE_ROOMS';

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

function changeRooms(roomId) {
  return {
    type: CHANGE_ROOMS,
    data: { roomId },
  };
}

function loadHistory(dispatch) {
  const headers = new Headers();
  headers.append('Authorization', `Bearer: ${authToken}`)
  return fetch('/api/history', { headers })
    .then(resp => resp.json());
}

function connectApp() {
  return (dispatch) => {
    connectSocketActions(dispatch);
    SocketManager.connect();

    loadHistory(dispatch).then(resp => {
      dispatch(historyLoaded(resp));
      resp.rooms.forEach(room => SocketManager.subscribeToRoom(room.id));
    });
  }
}

function connectSocketActions(dispatch) {
  SocketManager.on('presence_state', resp => dispatch(presenceSynced(resp)));
  SocketManager.on('presence_diff', resp => dispatch(presenceDiff(resp)));
  SocketManager.on('new:message', resp => dispatch(newMessage(resp)));
}

function sendMessage(body) {
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

    SocketManager.push(
      getState().currentRoomId,
      'new:message',
      {
        body,
        client_timestamp: timestamp,
      }
    ).receive('ok', resp =>
      dispatch(messageSentAcked(resp))
    );
  }
}

export {
  connectApp,
  changeRooms,
  sendMessage,
};
