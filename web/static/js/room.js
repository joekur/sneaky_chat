import React from 'react';
import { connect } from 'react-redux';
import MessageList from './message_list';

class Room extends React.Component {
  render() {
    return (
      <div>
        <MessageList />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Room);
