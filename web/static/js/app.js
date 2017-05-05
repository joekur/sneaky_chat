import React from "react";
import ReactDOM from "react-dom";
import { Socket, Presence } from 'phoenix';


class Foo extends React.Component {
  render() {
    return <span>hello</span>;
  }
}

ReactDOM.render(<Foo />, document.getElementById('app'));
console.log('hey')

const socket = new Socket('/socket', {});
socket.connect();
