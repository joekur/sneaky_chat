import React from 'react';
import { connect } from 'react-redux';
import { sendMessage } from  './actions';
import ContentEditable from 'react-contenteditable';

class MessageBox extends React.Component {
  constructor() {
    super();

    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      body: '',
    };
  }

  html2text(html) {
    const el = document.createElement('div');
    el.innerHTML = html;
    return el.innerText;
  }

  handleKeyPress(e) {
    if (e.key === 'Enter' && !e.nativeEvent.shiftKey && this.state.body) {
      e.preventDefault();
      const strippedBody = this.html2text(this.state.body);
      this.props.onSendMessage(strippedBody);
      this.setState({ body: '' });
    }
  }

  handleChange(e) {
    this.setState({ body: e.target.value });
  }

  render() {
    return (
      <div className="messagebox">
        <ContentEditable
          className="messagebox__editable"
          html={this.state.body}
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
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
    onSendMessage: (body) => { dispatch(sendMessage(body)) },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageBox);
