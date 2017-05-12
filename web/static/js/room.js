import React from 'react';
import MessageListContainer from './message_list_container';
import MessageBox from './message_box';

class Room extends React.Component {
  render() {
    return (
      <div className="room-container">
        <MessageListContainer />
        <MessageBox />
      </div>
    );
  }
}

export default Room;
