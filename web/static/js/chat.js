import React from 'react';
import { connect } from 'react-redux';
import { connectApp } from  './actions';
import RoomsBar from './rooms_bar/rooms_bar';
import Room from './room';

class Chat extends React.Component {
  componentWillMount() {
    this.props.connectApp();
  }

  render() {
    return (
      <div className="chat-container">
        <RoomsBar />
        <Room />
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
    connectApp: () => { dispatch(connectApp()) }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);
