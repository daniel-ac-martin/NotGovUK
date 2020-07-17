import { FC, createElement as h } from 'react';
import { A } from '../';

const Anchor: FC<any> = props => (
  <A
    classBlock={props.className}
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
