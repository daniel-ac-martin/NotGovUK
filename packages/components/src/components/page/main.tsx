import { FC, createElement as h } from 'react';
import { className } from '../../helpers';

const Main: FC<any> = props => (
  <main {...props} className={className('govuk-main-wrapper', props.className)}>
    {props.children}
  </main>
);

export default Main;
