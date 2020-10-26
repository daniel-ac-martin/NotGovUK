import { FC, Fragment, createElement as h } from 'react';
import { StandardProps, classBuilder } from '@not-govuk/component-helpers';
import { Link, LinkProps } from '@not-govuk/link';
import { WidthContainer } from '@not-govuk/width-container';

import '../assets/Footer.scss';

type Link = LinkProps & {
  /** Text of the link */
  text: string
};

type NavMenu = {
  /** Number of columns to display the links in */
  columns?: number
  /** List of links to choose from */
  items: Link[]
  /** Title of the menu */
  title: string
};

export type FooterProps = StandardProps & {
  /** Whether to add the standard Gov.UK content */
  govUK?: boolean
  /** Maximum width of the contents in px units (-1 for full width) */
  maxContentsWidth?: number
  /** Links to meta information */
  meta?: Link[]
  /** Title for meta links (visually hidden) */
  metaTitle?: string
  /** Secondary navigation menus */
  navigation?: NavMenu[]
};

export const Footer: FC<FooterProps> = ({
  children,
  classBlock,
  classModifiers,
  className,
  govUK = false,
  maxContentsWidth,
  meta,
  metaTitle = 'Support links',
  navigation,
  ...attrs
}) => {
  const classes = classBuilder('govuk-footer', classBlock, classModifiers, className);
  const A = (props: LinkProps) => h(Link, { classBlock: classes('link'), ...props });

  return (
    <footer {...attrs} className={classes()} role="contentinfo">
      <WidthContainer maxWidth={maxContentsWidth}>
        { !navigation ? null : (
          <Fragment>
            <div className={classes('navigation')}>
              { navigation.map(({ columns, title, items }, i) => (
                <div key={i} className={classes('section')}>
                  <h2 className={classes('heading', undefined, 'govuk-heading-m')}>
                    {title}
                  </h2>
                  <ul className={classes('list', columns ? `columns-${columns}` : undefined)}>
                    { items.map(({ text, ...linkAttrs }, i2) => (
                      <li key={i2} className={classes('list-item')}>
                        <A {...linkAttrs}>{text}</A>
                      </li>
                    )) }
                  </ul>
                </div>
              )) }
            </div>
            <hr className={classes('section-break')} />
          </Fragment>
        ) }
        { !govUK && !meta ? children : (
            <div className={classes('meta')}>
              <div className={classes('meta-item', 'grow')}>
                { !meta ? null : (
                  <Fragment>
                    <h2 className="govuk-visually-hidden">
                      {metaTitle}
                    </h2>
                    <ul className={classes('inline-list')}>
                      { meta.map(({ text, ...linkAttrs }, i) => (
                        <li key={i} className={classes('inline-list-item')}>
                          <A {...linkAttrs}>{text}</A>
                        </li>
                      )) }
                    </ul>
                  </Fragment>
                ) }
                { !children ? null : (
                  <div className={classes('meta-custom')}>
                    {children}
                  </div>
                ) }
                { !govUK ? null : (
                  <Fragment>
                    <svg aria-hidden="true" focusable="false" className={classes('licence-logo')} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 483.2 195.7" height="17" width="41">
                      <path fill="currentColor" d="M421.5 142.8V.1l-50.7 32.3v161.1h112.4v-50.7zm-122.3-9.6A47.12 47.12 0 0 1 221 97.8c0-26 21.1-47.1 47.1-47.1 16.7 0 31.4 8.7 39.7 21.8l42.7-27.2A97.63 97.63 0 0 0 268.1 0c-36.5 0-68.3 20.1-85.1 49.7A98 98 0 0 0 97.8 0C43.9 0 0 43.9 0 97.8s43.9 97.8 97.8 97.8c36.5 0 68.3-20.1 85.1-49.7a97.76 97.76 0 0 0 149.6 25.4l19.4 22.2h3v-87.8h-80l24.3 27.5zM97.8 145c-26 0-47.1-21.1-47.1-47.1s21.1-47.1 47.1-47.1 47.2 21 47.2 47S123.8 145 97.8 145" />
                    </svg>
                    <span className={classes('license-description')}>
                      All content is available under the
                      {' '}
                      <A href="https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/" rel="license">Open Government Licence v3.0</A>, except where otherwise stated
                    </span>
                  </Fragment>
                ) }
              </div>
              { !govUK ? null : (
                <div className={classes('meta-item')}>
                  <A className={classes('copyright-logo')} href="https://www.nationalarchives.gov.uk/information-management/re-using-public-sector-information/uk-government-licensing-framework/crown-copyright/">© Crown copyright</A>
                </div>
              ) }
            </div>
        ) }
      </WidthContainer>
    </footer>
  );
};

export default Footer;
