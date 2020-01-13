import * as React from 'react';
import { A } from '../..';
import { className } from '../../helpers';

export interface INavigationLink {
  /** Whether the link is for the current page */
  active?: boolean,
  /** Location to link to */
  href: string,
  /** Text of the link */
  text: string,
  /** Title of the link */
  title?: string
};

export interface IHeader {
  /** Extra CSS classes to be applied */
  className?: string,
  /** HTML id */
  id?: string,
  /** HRef for the Crown logo link */
  logoHref?: string,
  /** Navigation links */
  navigation?: Array<INavigationLink>,
  /** HRef for the sign-out link */
  signOutHref?: string,
  /** Text for the sign-out link */
  signOutText?: string,
  /** Service title */
  title?: string,
  /** Location linked to by the service title */
  titleHref?: string
};

export const Header: React.SFC<IHeader> = props => {
  const links = (
    <ul>
      {props.navigation.map((v, i) => (
        <li key={i} className={v.active ? 'active' : undefined}>
          <A href={v.href} title={v.title}>{v.text}</A>
        </li>
      ))}
    </ul>
  );
  const serviceTitle = (
    <A id="service-title" href={props.titleHref}>{props.title}</A>
  );
  const nav = (
    <div id="nav">
      {props.title ? serviceTitle : ''}
      {props.navigation.length ? links : ''}
    </div>
  );
  const signOut = (
    <A href={props.signOutHref}>{props.signOutText}</A>
  );

  return (
    <header id={props.id} className={className('page-header', props.className)}>
      <div className="inner">
        <A id="logo" href={props.logoHref}></A>
        {props.title || props.navigation.length ? nav : ''}
        <div id="sign-out">
          {props.signOutHref ? signOut : ''}
        </div>
      </div>
    </header>
  );
};

Header.defaultProps = {
  className: null,
  id: null,
  logoHref: 'https://www.gov.uk/',
  navigation: [],
  signOutHref: null,
  signOutText: 'Sign out',
  title: null,
  titleHref: '/'
};

export default Header;
