import { Socket } from 'phoenix';
import { authToken } from './auth';

class SocketManager {
  constructor() {
    this.socket = null;
    this.channels = {};
    this.listenedEvents = [];
  }

  connect() {
    this.socket = new Socket('/socket', {});
    this.socket.connect();
  }

  subscribeToRoom(roomId) {
    const channel = this.socket.channel(`room:${roomId}`, { auth_token: authToken });
    channel.join();

    this.channels[roomId] = channel;

    this.listenedEvents.forEach(e => {
      channel.on(e.event, e.callback);
    });
  }

  on(event, callback) {
    this.listenedEvents.push({
      event,
      callback,
    });
  }

  push(roomId, event, params) {
    return this.channels[roomId].push(event, params);
  }
}

export default new SocketManager();
