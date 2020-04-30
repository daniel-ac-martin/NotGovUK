import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { A } from '../';
import { className } from '../../helpers';

interface IBackLink {
  /** Extra CSS classes to be applied */
  className?: string,
  /** The location to link to */
  href?: string,
  /** HTML id */
  id?: string,
  /** The text of the link */
  text?: string,
  /** The title of the link */
  title?: string
};

export const BackLink: React.SFC<IBackLink> = props => {
  const history = useHistory();
  const classes = className('govuk-back-link', props.className);

  return props.href ? (
    <A
      className={classes}
      href={props.href}
      id={props.id}
      title={props.title}
    >
      {props.text}
    </A>
  ) : (
    <a
      className={classes}
      href="#"
      id={props.id}
      onClick={history.goBack}
      title={props.title}
    >
      {props.text}
    </a>
  );
};

BackLink.defaultProps = {
  className: null,
  href: null,
  id: null,
  text: 'Back',
  title: null
};

export default BackLink;
