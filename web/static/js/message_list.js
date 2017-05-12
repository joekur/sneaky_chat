import React from 'react';
import { connect } from 'react-redux';
import orm from './orm';
import * as _ from 'lodash';
import UserMessageGroup from './user_message_group';

class MessageList extends React.Component {
  // Return arrays of arrays of Messages. Consecutive messages by the
  // same user within 10 minutes are grouped together
  get messageGroups() {
    const groups = [[]];
    let lastMessage = null;

    this.props.messages.forEach(msg => {
      if (!lastMessage || msg.isGroupableWith(lastMessage)) {
        // add to last group
        _.last(groups).push(msg);
      } else {
        // create new group
        groups.push([ msg ]);
      }
      lastMessage = msg
    })

    return groups;
  }

  renderMessages() {
    return this.messageGroups.map((group, i) =>
      <UserMessageGroup
        key={i}
        messages={group}
      />
    );
  }

  render() {
    if (_.isEmpty(this.props.messages)) { return null; }

    return (
      <div className="messagelist">
        {this.renderMessages()}
      </div>
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
)(MessageList);
