import * as React from 'react';

const Hint: React.SFC<any> = props => (
  <span id={props.id} className="hint">{props.children}</span>
);

export default Hint;
