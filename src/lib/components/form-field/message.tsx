import * as React from 'react';

const Message: React.SFC<any> = props => (
  <span id={props.id} className="message">{props.children}</span>
);

export default Message;
