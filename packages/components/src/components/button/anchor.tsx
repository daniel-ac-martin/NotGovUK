import * as React from 'react';
import { A } from '../';

const Anchor: React.SFC<any> = props => (
  <A
    className={props.className}
    data-module="govuk-button"
    draggable={false}
    href={props.href}
    id={props.id}
    role="button"
  >
    {props.children || props.text}
  </A>
);

export default Anchor;
