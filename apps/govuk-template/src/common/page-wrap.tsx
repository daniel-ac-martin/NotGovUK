import { FC, createElement as h } from 'react';
import { PageProps } from '@not-govuk/app-composer';
import { GovUKPage } from '@not-govuk/components';
import { useUserInfo } from '@not-govuk/user-info';
import config from './config';

import './app.scss';

const siteTitle = config.title;

export const PageWrap: FC<PageProps> = ({ routes: _routes, signInHRef, signOutHRef, children }) => {
  // We add an extra, non-existent, route in order to test unhappy path
  const routes = [
    ..._routes,
    {
      href: '/404',
      title: '404'
    }
  ];
  const navigation = (
    routes
      .map(e => ({
        href: e.href,
        text: e.title
      }))
      .sort((a, b) => a.href > b.href ? 1 : -1)
  );
  const userInfo = useUserInfo();
  const sign = (
    userInfo && userInfo.username
      ? {
        href: signOutHRef,
        text: 'Sign out'
      }
      : {
        href: signInHRef,
        text: 'Sign in'
      }
  );

  return (
    <GovUKPage
      feedbackHref="/feedback"
      navigation={navigation}
      phase="Alpha"
      serviceHref="/"
      serviceName={siteTitle}
      signOutHref={sign.href}
      signOutText={sign.text}
      title={siteTitle}
    >
      {children}
    </GovUKPage>
  );
};

export default PageWrap;
