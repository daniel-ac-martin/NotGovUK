import { FC, HTMLAttributes, ReactNode, createElement as h } from 'react';
import { StandardProps, classBuilder } from '@react-foundry/component-helpers';
import { A } from '@not-govuk/link';
import { WidthContainer } from '@not-govuk/width-container';
import { CoatLogo } from './CoatLogo';

import '../assets/GenericHeader.scss';

export type GenericHeaderProps = StandardProps & HTMLAttributes<HTMLDivElement> & {
  /** Department branding to use (e.g. home-office) */
  department?: string
  /** Maximum width of the contents in px units (-1 for full width) */
  maxContentsWidth?: number
  /** Organisation link URL */
  organisationHref?: string
  /** Organisation link text */
  organisationText?: string
  /** Service link URL */
  serviceHref?: string
  /** Service link text */
  serviceName?: string
  /** Custom logo, use null to remove */
  logo?: ReactNode
};


// Manual mappings of CSS names to display names/abbreviations (not currently required)
const departmentMap: Record<string, string> = {
  'not-govuk': '!GOV.UK'
};

const departmentText = (d?: string) => {
  if (!d) {
    return null;
  }

  const mapped = departmentMap[d];

  if (mapped) {
    return mapped;
  }

  const words = d.split('-');
  const short = words.length <= 3;
  const veryShort = words.length <= 2;

  return (
    words
      .map(e => {
        switch (e) {
          case 'and':
            return '';
          case 'hm':
            return 'HM';
          case 'for':
            return short ? 'f' : '';
          case 'of':
            return short ? 'o' : '';
          case 'the':
            return '';
          default:
            return (
              e.charAt(0).toUpperCase() + (
                !veryShort ? '' : e.substring(1)
              )
            );
        }
      })
      .join(!veryShort ? '' : ' ')
  );
};

export const GenericHeader: FC<GenericHeaderProps> = ({
  classBlock,
  classModifiers: _classModifiers = [],
  className,
  department,
  maxContentsWidth,
  organisationHref: _organisationHref,
  organisationText: _organisationText,
  serviceHref = '/',
  serviceName,
  logo: _logo,
  ...attrs
}) => {
  const classModifiers = (
    Array.isArray(_classModifiers)
    ? _classModifiers
    : [_classModifiers]
  );
  const classes = classBuilder('govuk-generic-header', classBlock, [...classModifiers, department], className);
  const organisationHref = _organisationHref || '/';
  const organisationText = _organisationText || departmentText(department);
  const logo = _logo || (!department ? null : (
    <CoatLogo aria-hidden="true" focusable="false" className={classes('logotype', ['coat'])} height="40" width="40" />
  ));

  return (
    <div {...attrs} className={classes()}>
      <WidthContainer maxWidth={maxContentsWidth} className={classes('container')}>
        <div className={classes('logo')}>
          <A href={organisationHref} classBlock={classes('homepage-link')}>
            {logo}
            {!organisationText ? null : (
              <span className={classes('logotype-text')}>{organisationText}</span>
            )}
          </A>
          {!serviceName ? null : (
            <A href={serviceHref} classBlock={classes('product-link')}>{serviceName}</A>
          )}
        </div>
      </WidthContainer>
    </div>
  );
};

export default GenericHeader;
