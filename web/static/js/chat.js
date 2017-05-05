import React from "react";
import { Socket, Presence } from 'phoenix';

class Chat extends React.Component {
  constructor() {
    super();

    this.socket = null;
    this.channel = null;
    this.state = {
      presence: {},
      connected: false,
      connectError: false,
    }

    this.handlePresenceLoad = this.handlePresenceLoad.bind(this);
    this.handlePresenceDiff = this.handlePresenceDiff.bind(this);
  }

  componentDidMount() {
    this.connect();
  }

  connect() {
    this.socket = new Socket('/socket', {});
    this.socket.connect();

    this.channel = this.socket.channel('room:lobby', {});

    this.channel.join()
      .receive('ok', (resp) => {
        this.setState({ connected: true });
        console.log('joined', resp);
      })
      .receive('error', (resp) => {
        this.setState({ connectError: true });
        console.log('error joining', resp);
      });

    this.channel.on('presence_state', this.handlePresenceLoad);
    this.channel.on('presence_diff', this.handlePresenceDiff);
  }

  handlePresenceLoad(presence) {
    const syncedPresence = Presence.syncState(this.state.presence, presence);

    this.setState({ presence: syncedPresence });
  }

  handlePresenceDiff(diff) {
    const syncedPresence = Presence.syncDiff(this.state.presence, diff);
    this.setState({ presence: syncedPresence });
  }

  renderPeople() {
    const uuids = Object.keys(this.state.presence);
    return uuids.map((uuid) => <li key={uuid}>{uuid}</li>);
  }

  render() {
    return (
      <ul>
        {this.renderPeople()}
      </ul>
    );
  }
}

export default Chat;
