import React from 'react';
import reactStringReplace from 'react-string-replace';
import linkify from './linkify';

const imagePattern = /(^(https?:\/\/|www\.)[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|](\.gif|\.png|\.jpg|\.jpeg|\.bmp)$)/i;
const videoPattern = /(http:\/\/|www.|http:\/\/www.)youtube.com\/watch\?v\=(.+)/;

class MessageBody extends React.Component {
  getMatches(string) {
    return linkify.match(string);
  }

  nl2br(elements) {
    return reactStringReplace(elements, /(\n)/g, (match, i) => <br key={`br-${i}`} />);
  }

  parseUrls(string) {
    let elements = [];
    if (string === '') { return elements; }

    const matches = this.getMatches(string);
    if (!matches) { return string; }

    let lastIndex = 0;
    matches.forEach((match, idx) => {
      // Push the preceding text if there is any
      if (match.index > lastIndex) {
        elements.push(string.substring(lastIndex, match.index));
      }

      elements.push(this.renderUrl(match.url, idx));

      lastIndex = match.lastIndex;
    });

    if (lastIndex < string.length) {
      elements.push(string.substring(lastIndex));
    }

    return (elements.length === 1) ? elements[0] : elements;
  }

  renderUrl(url, idx) {
    const link = <a href={url} target="_blank" key={`link${idx}`}>{url}</a>;

    if (url.match(imagePattern)) {
      return [
        link,
        <img src={url} title={url} key={`link${idx}-2`} />,
      ];
    } else if (url.match(videoPattern)) {
      const src = `https://www.youtube.com/embed/${RegExp.$2}`;
      return [
        link,
        <iframe src={src} frameBorder='0' key={`link${idx}-2`} allowFullScreen />,
      ];
    }

    return link;
  }

  render() {
    let body = this.parseUrls(this.props.body)
    body = this.nl2br(body);

    return <div>{body}</div>;
  }
}

export default MessageBody;
