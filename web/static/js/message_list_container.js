import React from 'react';
import { connect } from 'react-redux';
import orm from './orm';
import * as _ from 'lodash';
import MessageList from './message_list';

class MessageListContainer extends React.Component {
  render() {
    if (_.isEmpty(this.props.messages)) {
      return null;
    }

    return (
      <MessageList {...this.props} />
    );
  }
}

function mapStateToProps(state) {
  return {
    messages: orm.session(state).Message.all().toModelArray(),
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
