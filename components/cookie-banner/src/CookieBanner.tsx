import { ComponentProps, FC, HTMLAttributes, ReactNode, createElement as h } from 'react';
import { ButtonGroup } from '@not-govuk/button-group';
import { StandardProps, classBuilder } from '@not-govuk/component-helpers';
import { WidthContainer } from '@not-govuk/width-container';

import '../assets/CookieBanner.scss';

export type Message = Omit<ComponentProps<typeof WidthContainer>, 'children' | 'classBlock' | 'className' | 'classModifiers' | 'maxContentsWidth'> & {
  /** Heading for the message */
  heading?: ReactNode
  /** Content of the message */
  content: ReactNode
  /** Actions that can be taken in reponse to the message, typically buttons or links */
  actions?: ReactNode
};

export type CookieBannerProps = StandardProps & HTMLAttributes<HTMLDivElement> & {
  /** Maximum width of the contents in px units (-1 for full width) */
  maxContentsWidth?: number
  /** List of messages to display */
  messages: Message[]
};

export const CookieBanner: FC<CookieBannerProps> = ({
  'aria-label': ariaLabel= 'Cookie banner',
  classBlock,
  classModifiers,
  className,
  maxContentsWidth,
  messages,
  ...attrs
}) => {
  const classes = classBuilder('govuk-cookie-banner', classBlock, classModifiers, className);

  const content = messages.map(({ actions, content, heading, ...attrs }, i) => (
    <WidthContainer key={i} {...attrs} maxWidth={maxContentsWidth} className={classes('message')}>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          { !heading ? null :
            <h2 className={classes('heading', undefined, 'govuk-heading-m')}>{heading}</h2>
          }
          <div className={classes('content')}>
            { content }
          </div>
        </div>
      </div>
      <ButtonGroup>
        {actions}
      </ButtonGroup>
    </WidthContainer>
  ) );

  return (
    <div {...attrs} className={classes()} data-nosnippet role="region" aria-label={ariaLabel}>
      { content }
    </div>
  );
};

CookieBanner.displayName = 'CookieBanner';

export default CookieBanner;
