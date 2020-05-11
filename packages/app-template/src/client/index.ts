import { hydrateOrRender } from '@not-govuk/client-renderer';
import { App } from '../common/app';
import { pageLoader } from '../common/page-loader';

hydrateOrRender(App, pageLoader);
