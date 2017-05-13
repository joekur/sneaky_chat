import React from 'react';
import { connect } from 'react-redux';
import { connectApp } from  '../actions';
import classNames from 'classnames';
import orm from '../orm';
import { changeRooms } from '../actions';
import UserRow from './user_row';

class RoomsBar extends React.Component {
  presenceFor(user) {
    return this.props.presence[user.id.toString()];
  }

  isActiveRoom(room) {
    return room.id === this.props.currentRoomId;
  }

  renderPeople() {
    return this.props.users.map((user) =>
      <UserRow
        user={user}
        presenceData={this.presenceFor(user)}
        key={user.id}
      />
    );
  }

  renderRooms() {
    return this.props.rooms.map((room) => {
      const classes = classNames(
        'rooms-bar__room',
        { 'rooms-bar__room--active': this.isActiveRoom(room) }
      );
      return (
        <li
          key={room.id}
          className={classes}
          onClick={() => { this.props.onChangeRoom(room.id) }}
        >
          {room.name}
        </li>
      );
    });
  }

  render() {
    return (
      <div className="rooms-bar">
        <h3 className="rooms-bar__heading">Rooms</h3>
        <ul className="rooms-bar__rooms">
          {this.renderRooms()}
        </ul>
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
    currentRoomId: state.currentRoomId,
    users: orm.session(state).User.all().toModelArray(),
    rooms: orm.session(state).Room.all().toModelArray(),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onChangeRoom: id => dispatch(changeRooms(id)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RoomsBar);
