import { hydrateOrRender } from '@not-govuk/client-renderer';
import { AppWrap } from '../common/app-wrap.js';
import { PageWrap } from '../common/page-wrap.js';
import { ErrorPage } from '../common/error-page.js';
import { LoadingPage } from '../common/loading-page.js';
import { pageLoader } from '../common/page-loader.js';

const main = () => {
  hydrateOrRender({
    AppWrap,
    PageWrap,
    ErrorPage,
    LoadingPage,
    pageLoader
  });
};

main();

if (module.hot) {
  const restart = () => {
    console.log('Restarting...');
    main();
  };

  module.hot.accept([
    '@not-govuk/client-renderer',
    '../common/app-wrap',
    '../common/error-page',
    '../common/loading-page',
    '../common/page-loader',
    '../common/page-wrap',
  ], restart);
}
