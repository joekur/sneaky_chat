import React from 'react';
import { connect } from 'react-redux';
import orm from './orm';
import Message from './message';

class MessageList extends React.Component {
  renderMessages() {
    return this.props.messages.map((message, i) =>
      <Message key={i} message={message} />
    )
  }

  render() {
    if (!this.props.messages) {
      return null;
    }

    return (
      <div className="messagelist">
        {this.renderMessages()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    messages: orm.session(state).Message.all().toRefArray(),
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
