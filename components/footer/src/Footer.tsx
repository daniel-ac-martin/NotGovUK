import { FC, Fragment, HTMLAttributes, ReactNode, createElement as h } from 'react';
import { StandardProps, classBuilder } from '@not-govuk/component-helpers';
import { Link, LinkProps } from '@not-govuk/link';
import { WidthContainer } from '@not-govuk/width-container';
import { CrownLogo } from './CrownLogo';
import { OGLLogo } from './OGLLogo';

import '../assets/Footer.scss';

type Link = LinkProps & {
  /** Text of the link */
  text: string
};

export type NavMenu = {
  /** Number of columns to display the links in */
  columns?: number
  /** Width of each navigation section in the footer. Defaults to full width. You can pass any design system grid width here, for example, 'one-third'; 'two-thirds'; 'one-half'. */
  width?: number
  /** List of links to choose from */
  items: Link[]
  /** Title of the menu */
  title: string
};

export type FooterProps = StandardProps & HTMLAttributes<HTMLElement> & {
  children?: ReactNode
  /** Department branding to use (e.g. home-office) */
  department?: string
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
  /** If true, use the redesigned footer with the GOV.UK crown  */
  rebrand?: boolean
};

export const Footer: FC<FooterProps> = ({
  children,
  classBlock,
  classModifiers: _classModifiers = [],
  className,
  department,
  govUK = false,
  maxContentsWidth,
  meta,
  metaTitle = 'Support links',
  navigation,
  rebrand = false,
  ...attrs
}) => {
  const classModifiers = (
    Array.isArray(_classModifiers)
      ? _classModifiers
      : [_classModifiers]
  );
  const classes = classBuilder('govuk-footer', classBlock, [...classModifiers, department], className);
  const A = (props: LinkProps) => h(Link, { classBlock: classes('link'), ...props });

  return (
    <footer {...attrs} className={classes()}>
      <WidthContainer maxWidth={maxContentsWidth}>
        { !(rebrand && govUK) ? null : (
          <CrownLogo focusable="false" className={classes('crown')} height="30" width="32" />
        )}
        { !navigation ? null : (
          <Fragment>
            <div className={classes('navigation')}>
              { navigation.map(({ columns, width, title, items }, i) => (
                <div key={i} className={classes('section', undefined, !width ? undefined : `govuk-grid-column-${width}`)}>
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
                    <OGLLogo focusable="false" className={classes('licence-logo')} height="17" width="41" />
                    <span className={classes('license-description')}>
                      All content is available under the <A href="https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/" rel="license">Open Government Licence v3.0</A>, except where otherwise stated
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
