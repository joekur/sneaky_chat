import React from 'react';

class UserStatusLight extends React.Component {
  render() {
    if (this.props.presenceData) {
      return (
        <span className="status-light status-light--online" />
      );
    }

    return (
      <span className="status-light status-light--offline" />
    );
  }
}

export default UserStatusLight;
