import React from 'react';
import MessageList from './message_list';
import MessageBox from './message_box';

class Room extends React.Component {
  render() {
    return (
      <div className="room-container">
        <MessageList />
        <MessageBox />
      </div>
    );
  }
}

export default Room;
