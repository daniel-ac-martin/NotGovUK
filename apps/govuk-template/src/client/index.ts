import { hydrateOrRender } from '@not-govuk/client-renderer';
import { AppWrap } from '../common/app-wrap';
import { PageWrap } from '../common/page-wrap';
import { ErrorPage } from '../common/error-page';
import { LoadingPage } from '../common/loading-page';
import { pageLoader } from '../common/page-loader';

hydrateOrRender(AppWrap, PageWrap, ErrorPage, LoadingPage, pageLoader);
