import { FC, HTMLAttributes, ReactNode, createElement as h, useEffect, useRef } from 'react';
import { StandardProps, classBuilder } from '@not-govuk/component-helpers';

import '../assets/NotificationBanner.scss';

export type NotificationBannerProps = StandardProps & HTMLAttributes<HTMLDivElement> & {
  /** If you set type to success, or role to alert, JavaScript moves the keyboard focus to the notification banner when the page loads. To disable this behaviour, set disableAutoFocus to true. */
  disableAutoFocus?: boolean
  /** The content that displays in the notification banner. */
  children?: ReactNode
  /** The title that displays in the notification banner. The available default values are 'Important' and 'Success' depending on how 'type' has been set. */
  title?: ReactNode
  /** The id for the banner title, and the aria-labelledby attribute in the banner. Defaults to govuk-notification-banner-title. */
  titleId?: string
  /** The type of notification to render. You can use only the success or null values with this option. If you set type to success, the notification banner sets role to alert. JavaScript then moves the keyboard focus to the notification banner when the page loads. If you do not set type, the notification banner sets role to region. */
  type?: 'success'
};

export const NotificationBanner: FC<NotificationBannerProps> = ({
  children,
  classBlock,
  classModifiers: _classModifiers = [],
  className,
  disableAutoFocus = false,
  role: _role,
  title: _title,
  titleId: _titleId,
  type: _type,
  ...attrs
}) => {
  const isSuccess = _type === 'success';
  const classModifiers = [
    isSuccess && 'success',
    ...(Array.isArray(_classModifiers) ? _classModifiers : [_classModifiers])
  ];
  const classes = classBuilder('govuk-notification-banner', classBlock, classModifiers, className);
  const role = _role || (
    isSuccess
    ? 'alert'
    : 'region'
  );
  const title = _title || (
    isSuccess
    ? 'Success'
    : 'Important'
  );
  const titleId = _titleId || (
    (attrs.id || 'govuk-notification-banner') + '-title'
  );
  const autoFocus = role === 'alert' && !disableAutoFocus;
  const ref = useRef(null);

  useEffect(() => {
    if (autoFocus) {
      // Make the element focussable with JavaScript
      // See: https://github.com/alphagov/govuk-frontend/blob/e6351f64dc5e214e473d53f17e0948eb38a32608/src/govuk/components/notification-banner/notification-banner.mjs#L71
      if (!ref.current.getAttribute('tabindex')) {
        ref.current.setAttribute('tabindex', '-1')

        ref.current.addEventListener('blur', function () {
          ref.current.removeAttribute('tabindex')
        })
      }

      ref.current.focus();
    }
  });

  return (
    <div
      {...attrs}
      className={classes()}
      ref={ref}
      role={role}
      aria-labelledby={titleId}
      data-module="govuk-notification-banner"
    >
      <div className={classes('header')}>
        {typeof title !== 'string' ? title : (
          <h2 className={classes('title')} id={titleId}>{title}</h2>
        )}
      </div>
      <div className={classes('content')}>
        {typeof children !== 'string' ? children : (
          <p className={classes('heading')}>{children}</p>
        )}
      </div>
    </div>
  );
};

NotificationBanner.displayName = 'NotificationBanner';

export default NotificationBanner;
