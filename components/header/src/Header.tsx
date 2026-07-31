import { FC, HTMLAttributes, ReactNode, createElement as h } from 'react';
import { StandardProps, classBuilder } from '@react-foundry/component-helpers';
import { A } from '@not-govuk/link';
import { WidthContainer } from '@not-govuk/width-container';
import { CrownLogo } from './CrownLogo';

import '../assets/Header.scss';

export type HeaderProps = StandardProps & HTMLAttributes<HTMLDivElement> & {
  /** Maximum width of the contents in px units (-1 for full width) */
  maxContentsWidth?: number
  /** Organisation link URL */
  organisationHref?: string
  /** Service link URL */
  serviceHref?: string
  /** Service link text */
  serviceName?: string
};

export const Header: FC<HeaderProps> = ({
  classBlock,
  classModifiers,
  className,
  maxContentsWidth,
  organisationHref = 'https://www.gov.uk/',
  serviceHref = '/',
  serviceName,
  ...attrs
}) => {
  const classes = classBuilder('govuk-header', classBlock, classModifiers, className);
  const logoHref = (serviceName && serviceHref) || organisationHref;
  const logo = (
    <CrownLogo focusable="false" className={classes('logotype')} height="30" width="162" />
  );

  return (
    <div {...attrs} className={classes()}>
      <WidthContainer maxWidth={maxContentsWidth} className={classes('container')}>
        <div className={classes('logo')}>
          <A href={logoHref} classBlock={classes('homepage-link')}>
            {logo}
            {!serviceName ? null : (
              <span className={classes('product-name')}>{serviceName}</span>
            )}
          </A>
        </div>
      </WidthContainer>
    </div>
  );
};

export default Header;
