import React from 'react';
import { connect } from 'react-redux';
import selectors from './selectors';
import * as _ from 'lodash';
import MessageList from './message_list';

class MessageListContainer extends React.Component {
  render() {
    if (!this.props.room) {
      return <div className="messagelist" />;
    }

    return (
      <MessageList messages={this.props.room.messages.toModelArray()} />
    );
  }
}

function mapStateToProps(state) {
  return {
    room: selectors.currentRoom(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageListContainer);
