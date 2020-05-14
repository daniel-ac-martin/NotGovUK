import { hydrateOrRender } from '@not-govuk/client-renderer';
import { PageWrap } from '../common/page-wrap';
import { ErrorPage } from '../common/error-page';
import { LoadingPage } from '../common/loading-page';
import { pageLoader } from '../common/page-loader';

hydrateOrRender(PageWrap, ErrorPage, LoadingPage, pageLoader);
