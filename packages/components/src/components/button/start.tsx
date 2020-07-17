import { FC, createElement as h } from 'react';
import Anchor from './anchor';
import { className } from '../../helpers';

const Start: FC<any> = props => (
  <Anchor {...props} className={className('govuk-button--start', props.className)}>
    {props.text}
    <svg className="govuk-button__start-icon" xmlns="http://www.w3.org/2000/svg" width="17.5" height="19" viewBox="0 0 33 40" role="presentation" focusable="false">
      <path fill="currentColor" d="M0 0h13l20 20-20 20H0l20-20z" />
    </svg>
  </Anchor>
);

export default Start;
