import { FC, createElement as h } from 'react';

const ErrorMessage: FC<any> = props => (
  <span id={props.id} className="govuk-error-message"><span className="invisible">Error:</span> {props.children}</span>
);

export default ErrorMessage;
