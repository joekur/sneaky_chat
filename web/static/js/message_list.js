import React from 'react';
import { connect } from 'react-redux';
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
    messages: state.messages,
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
