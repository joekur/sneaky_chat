import React from 'react';
import { connect } from 'react-redux';
import { connectApp } from  './actions';

class RoomsBar extends React.Component {
  renderPeople() {
    return this.props.users.map((user) =>
      <li key={user.id}>{user.username}</li>
    );
  }

  render() {
    return (
      <div className="rooms-bar">
        <h3 className="rooms-bar__heading">People</h3>
        <ul className="rooms-bar__people">
          {this.renderPeople()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    presence: state.presence,
    users: state.users,
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RoomsBar);
