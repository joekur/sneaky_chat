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

  render() {
    return (
      <ul>
        {this.renderPeople()}
      </ul>
    );
  }
}

function mapStateToProps(state) {
  return {
    presence: state.presence,
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
