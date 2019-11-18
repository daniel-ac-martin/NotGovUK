import * as React from 'react';

const Anchor: React.SFC<any> = props => (
  <a id={props.id} className={props.className} href={props.href}>{props.text}</a>
);

export default Anchor;
