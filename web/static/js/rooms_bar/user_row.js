import React from 'react';
import UserStatusLight from './user_status_light';

class UserRow extends React.Component {
  render() {
    return (
      <li>
        <UserStatusLight presenceData={this.props.presenceData} />
        {this.props.user.username}
      </li>
    );
  }
}

export default UserRow;
