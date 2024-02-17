import { FC, createElement as h } from 'react';
import { StandardProps, classBuilder } from '@not-govuk/component-helpers';
import { Link, LinkProps } from '@not-govuk/link';
import { WidthContainer } from '@not-govuk/width-container';
import { CrownLogo } from './CrownLogo';
import { CoatLogo } from './CoatLogo';
import { TudorCrownLogo } from './TudorCrownLogo';

import '../assets/Header.scss';

export type NavigationLink = LinkProps & {
  /** Whether the link is for the current page */
  active?: boolean,
  /** Text of the link */
  text: string
};

export type HeaderProps = StandardProps & {
  /** Department branding to use (e.g. home-office) */
  department?: string
  /** Whether to add the standard Gov.UK content */
  govUK?: boolean
  /** Maximum width of the contents in px units (-1 for full width) */
  maxContentsWidth?: number
  /** Navigation links */
  navigation?: NavigationLink[]
  /** Organisation link URL */
  organisationHref?: string
  /** Organisation link text */
  organisationText?: string
  /** Service link URL */
  serviceHref?: string
  /** Service link text */
  serviceName?: string
  /** Sign out link URL */
  signOutHref?: string
  /** Sign out link text */
  signOutText?: string
  /** Whether to use the tudor crown of King Charles III */
  useTudorCrown?: boolean
};

const departmentMap = {
  'home-office': 'Home Office',
  'department-for-communities-and-local-government': 'DCLG',
  'department-for-culture-media-sport': 'DCMS',
  'department-for-environment-food-rural-affairs': 'DEFRA',
  'department-for-work-pensions': 'DWP',
  'foreign-commonwealth-office': 'FCO',
  'hm-revenue-customs': 'HMRC',
  'hm-treasury': 'HM Treasury',
  'ministry-of-justice': 'MoJ',
  'office-of-the-leader-of-the-house-of-lords': '',
  'scotland-office': 'Scotland Office',
  'wales-office': 'Wales Office'
};

const departmentText = (d: string) => (
  !d ? null
  : (
    departmentMap[d] || (
      d
        .split('-')
        .map(e => {
          switch (e) {
            case 'hm':
              return 'HM';
            case 'of':
              return 'o';
            case 'the':
              return '';
            default:
              return e.charAt(0).toUpperCase();
          }
        })
        .join('')
    )
  )
);

export const Header: FC<HeaderProps> = ({
  children,
  classBlock,
  classModifiers,
  className,
  department,
  govUK = false,
  maxContentsWidth,
  navigation = [],
  organisationHref,
  organisationText,
  serviceHref = '/',
  serviceName,
  signOutHref,
  signOutText = 'Sign out',
  useTudorCrown = false,
  ...attrs
}) => {
  const classes = classBuilder('govuk-header', classBlock, classModifiers, className);
  const A = (props: LinkProps) => h(Link, { classBlock: classes('link'), ...props });
  const orgHref = organisationHref || ( govUK ? 'https://www.gov.uk/' : '/' );
  const orgText = organisationText || ( govUK ? 'GOV.UK' : departmentText(department) );
  const navLinks = !signOutHref ? navigation : [...navigation, {
    href: signOutHref,
    text: signOutText,
    forceExternal: true
  }];

  return (
    <header {...attrs} className={classes()} role="banner" data-module="govuk-header">
      <WidthContainer maxWidth={maxContentsWidth} className={classes('container', department)}>
        <div className={classes('logo')}>
          <A href={orgHref} classModifiers={[ 'homepage', (orgText && orgText.length > 9) ? 'small' : undefined ]}>
            <span className={classes('logotype')}>
              {
                govUK
                ? (
                  useTudorCrown
                  ? (
                    <TudorCrownLogo aria-hidden="true" focusable="false" className={classes('logotype-crown')} height="30" width="32" fallback={{ className: classes('logotype-crown-fallback-image'), width: 32, height: 30 }} />
                  )
                  : (
                    <CrownLogo aria-hidden="true" focusable="false" className={classes('logotype-crown')} height="30" width="36" fallback={{ className: classes('logotype-crown-fallback-image'), width: 36, height: 32 }} />
                  )
                )
                : (
                  <CoatLogo aria-hidden="true" focusable="false" className={classes('logotype-coat')} height="30" width="36" fallback={{ className: classes('logotype-coat-fallback-image') }} />
                )
              }
              &nbsp;
              <span className={classes('logotype-text')}>
                {orgText}
              </span>
            </span>
          </A>
        </div>
        <div className={classes('content')}>
          { !serviceName ? null : (
            <A href={serviceHref} classModifiers="service-name">{serviceName}</A>
          ) }
          { !navLinks.length ? null : (
            <nav className={classes('navigation')} aria-label="Menu">
              <button type="button" className={classes('menu-button', undefined, 'govuk-js-header-toggle')} aria-controls="navigation" aria-label="Show or hide menu" hidden>Menu</button>
              <ul id="navigation" className={classes('navigation-list')}>
                { navLinks.map(({ active, text, ...linkAttrs }, i) => (
                  <li key={i} className={classes('navigation-item', active ? 'active' : undefined)}>
                    <A {...linkAttrs}>{text}</A>
                  </li>
                )) }
              </ul>
            </nav>
          ) }
        </div>
      </WidthContainer>
    </header>
  );
};

export default Header;
