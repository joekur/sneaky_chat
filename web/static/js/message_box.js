import React from 'react';
import { connect } from 'react-redux';
import { connectApp } from  './actions';
import ContentEditable from 'react-contenteditable';

class MessageBox extends React.Component {
  render() {
    return (
      <div className="messagebox">
        <ContentEditable
          className="messagebox__editable"
        />
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
    onSendMessage: () => { dipatch() }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageBox);
