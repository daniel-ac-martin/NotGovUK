import * as React from 'react';

const ErrorMessage: React.SFC<any> = props => (
  <span id={props.id} className="govuk-error-message"><span className="invisible">Error:</span> {props.children}</span>
);

export default ErrorMessage;
