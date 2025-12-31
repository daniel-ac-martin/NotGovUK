import type { RouteConfig } from '@react-router/dev/routes';
import { flatRoutes } from '@react-router/fs-routes';

export default flatRoutes({
  rootDirectory: 'routes'
}) satisfies RouteConfig;
