import { FC, createElement as h } from 'react';
import { className } from '../../helpers';

const Body: FC<any> = props => (
  <div {...props} className={className('nguk-page__body', props.className)}>
    {props.children}
  </div>
);

export default Body;
