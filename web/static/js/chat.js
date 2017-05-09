import React from "react";
import { connect } from 'react-redux';
import { connectApp } from  './actions';

class Chat extends React.Component {
  componentWillMount() {
    this.props.connectApp();
  }

  renderPeople() {
    const uuids = Object.keys(this.props.presence);
    return uuids.map((uuid) => <li key={uuid}>{uuid}</li>);
  }

  renderMessages() {
    if (!this.props.messages) { return null; }
    return this.props.messages.map(msg =>
      <div>{msg.body}</div>
    );
  }

  render() {
    return (
      <div>
        <ul>
          {this.renderPeople()}
        </ul>
        {this.renderMessages()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    presence: state.presence,
    messages: state.messages
  };
}

function mapDispatchToProps(dispatch) {
  return {
    connectApp: () => { dispatch(connectApp()) }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);
