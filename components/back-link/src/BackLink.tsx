import { FC, createElement as h } from 'react';
import { useHistory } from 'react-router-dom';
import { StandardProps, classBuilder } from '@not-govuk/component-helpers';
import { A } from '@not-govuk/link';

import '../assets/BackLink.scss';

export type BackLinkProps = StandardProps & {
  /** The location to link to */
  href?: string,
  /** The text of the link */
  text?: string,
  /** The title of the link */
  title?: string
};

export const BackLink: FC<BackLinkProps> = ({ children, classBlock, classModifiers, className, href, text = 'Back', ...attrs }) => {
  const defaultClassBlock = 'govuk-back-link';
  const classes = classBuilder(defaultClassBlock, classBlock, classModifiers, className);
  const history = useHistory();

  return href ? (
    <A {...attrs}
      classBlock={classBlock || defaultClassBlock}
      classModifiers={classModifiers}
      className={className}
      href={href}
    >
      {text}
    </A>
  ) : (
    <a {...attrs}
      className={classes()}
      href="#"
      onClick={history.goBack}
    >
      {text}
    </a>
  );
};

export default BackLink;
