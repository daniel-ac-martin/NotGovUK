import * as React from 'react';
import Message from './message';

const ErrorMessage: React.SFC<any> = props => (
  <Message id={props.id}><span className="invisible">Error:</span> {props.children}</Message>
);

export default ErrorMessage;
