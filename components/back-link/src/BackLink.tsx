'use client';

import { FC, ReactNode, createElement as h } from 'react';
import { StandardProps, classBuilder } from '@not-govuk/component-helpers';
import { A } from '@not-govuk/link';
import { useNavigate } from '@not-govuk/router';

import '../assets/BackLink.scss';

export type BackLinkProps = StandardProps & {
  children?: ReactNode
  /** The location to link to */
  href?: string
  /** The text of the link */
  text?: string
  /** The title of the link */
  title?: string
};

export const BackLink: FC<BackLinkProps> = ({
  children,
  classBlock,
  classModifiers,
  className,
  href,
  text: _text,
  ...attrs
}) => {
  const defaultClassBlock = 'govuk-back-link';
  const classes = classBuilder(defaultClassBlock, classBlock, classModifiers, className);
  const navigate = useNavigate();
  const text = _text || children || 'Back';
  const goBack = () => navigate && navigate(-1);

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
      onClick={goBack}
    >
      {text}
    </a>
  );
};

export default BackLink;
