import { type RouteConfig, index, route } from '@react-router/dev/routes';
import { flatRoutes } from '@react-router/fs-routes';

const routes_dir = 'routes';

export default flatRoutes({
  rootDirectory: routes_dir
}) satisfies RouteConfig;
