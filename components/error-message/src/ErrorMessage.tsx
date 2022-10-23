import { FC, HTMLAttributes, createElement as h } from 'react';
import { StandardProps, classBuilder } from '@not-govuk/component-helpers';
import { VisuallyHidden } from '@not-govuk/visually-hidden';

import '../assets/ErrorMessage.scss';

export type ErrorMessageProps = StandardProps & HTMLAttributes<HTMLParagraphElement>;

export const ErrorMessage: FC<ErrorMessageProps> = ({ children, classBlock, classModifiers, className, ...attrs }) => {
  const classes = classBuilder('govuk-error-message', classBlock, classModifiers, className);

  return (
    <p {...attrs} className={classes()}>
      <VisuallyHidden>Error:</VisuallyHidden> {children}
    </p>
  );
};

ErrorMessage.displayName = 'ErrorMessage';

export default ErrorMessage;
