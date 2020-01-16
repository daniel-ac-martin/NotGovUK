import * as React from 'react';
import { A } from '../';

const Anchor: React.SFC<any> = props => (
  <A id={props.id} className={props.className} href={props.href}>{props.text}</A>
);

export default Anchor;
