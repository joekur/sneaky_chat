import React from 'react';
import { connect } from 'react-redux';
import selectors from './selectors';
import * as _ from 'lodash';
import MessageList from './message_list';

class MessageListContainer extends React.Component {
  get isLoaded() {
    return !_.isEmpty(this.messages);
  }

  get messages() {
    return this.props.room && this.props.room.messages.toModelArray();
  }

  render() {
    if (!this.isLoaded) {
      return <div className="messagelist" />;
    }

    return (
      <MessageList messages={this.messages} />
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
