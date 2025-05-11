import { FC, HTMLAttributes, ReactNode, createElement as h } from 'react';
import { AnchorList, Anchor } from '@not-govuk/anchor-list';
import { StandardProps, classBuilder } from '@not-govuk/component-helpers';
import { A } from '@not-govuk/link';
import { WidthContainer } from '@not-govuk/width-container';

import '../assets/ServiceNavigation.scss';

export type { Anchor } from '@not-govuk/anchor-list';
export type Item = Anchor;

export type ServiceNavigationProps = StandardProps & HTMLAttributes<HTMLElement> & {
  /** Elements to be injected at the end of the service header container */
  end?: ReactNode
  /** List of links to choose from */
  items?: Item[]
  /** Maximum width of the contents in px units (-1 for full width) */
  maxContentsWidth?: number
  /** The text of the mobile navigation menu toggle */
  menuButtonText?: string
  /** The screen reader label for the mobile navigation menu toggle */
  menuButtonLabel?: string
  /** The screen reader label for the mobile navigation menu. Defaults to the same value as menuButtonText if not specified. */
  navigationLabel?: string
  /** The ID used to associate the mobile navigation toggle with the navigation menu. */
  navigationId?: string
  /** Service link URL */
  serviceHref?: string
  /** Service link text */
  serviceName?: string
  /** Sign out link URL */
  signOutHref?: string
  /** Sign out link text */
  signOutText?: string
  /** Elements to be injected at the start of the service header container */
  start?: ReactNode
};

export const ServiceNavigation: FC<ServiceNavigationProps> = ({
  'aria-label': ariaLabel = 'Service information',
  classBlock,
  classModifiers,
  className,
  end = null,
  items: _items = [],
  maxContentsWidth,
  menuButtonText = 'Menu',
  menuButtonLabel,
  navigationLabel: _navigationLabel,
  navigationId = 'navigation',
  serviceHref,
  serviceName,
  signOutHref,
  signOutText = 'Sign out',
  start = null,
  ...attrs
}) => {
  const classes = classBuilder('govuk-service-navigation', classBlock, classModifiers, className);
  const navigationLabel = _navigationLabel || menuButtonText;
  const items = !signOutHref ? _items : [..._items, {
    href: signOutHref,
    text: signOutText,
    forceExternal: true
  }];

  const serviceLink = !serviceName ? null : (
    <span className={classes('service-name')}>
      <A href={serviceHref} className={classes('link')}>
        {serviceName}
      </A>
    </span>
  );
  const nav = !items.length ? null : (
    <nav {...attrs} className={classes('wrapper')} aria-label={navigationLabel}>
      <button type="button" className={classes('toggle', undefined, 'govuk-js-service-navigation-toggle')} aria-controls={navigationId} aria-label={menuButtonLabel} hidden>
        {menuButtonText}
      </button>
      <AnchorList id={navigationId} classBlock={classes('list')} items={items} />
    </nav>
  );
  const inner = (
    <WidthContainer maxWidth={maxContentsWidth}>
      {start}
      <div className={classes('container')}>
        {serviceLink}
        {nav}
      </div>
      {end}
    </WidthContainer>
  );

  return (
    serviceName
      ? (
        <section {...attrs} className={classes()} aria-label={ariaLabel} data-module="govuk-service_navigation" >
          {inner}
        </section>
      )
      : (
        <div {...attrs} className={classes()} data-module="govuk-service_navigation" >
          {inner}
        </div>
      )
  );
};

ServiceNavigation.displayName = 'ServiceNavigation';

export default ServiceNavigation;
