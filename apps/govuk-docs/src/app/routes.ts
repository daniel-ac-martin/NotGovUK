import { join } from 'node:path';
import { type RouteConfig, index, route } from '@react-router/dev/routes';

const routes_dir = 'routes';

export default [
  index(join(routes_dir, '_index.tsx')),
  route('design-decisions', join(routes_dir, 'design-decisions.tsx')),
  route('get-started', join(routes_dir, 'get-started.tsx')),
  route('styles', join(routes_dir, 'styles.tsx')),
  route('styles/:id', join(routes_dir, 'styles.$id.tsx')),
  route('components', join(routes_dir, 'components.tsx')),
  route('components/:id', join(routes_dir, 'components.$id.tsx')),
  route('contributing', join(routes_dir, 'contributing.tsx')),
  route('working-on-your-project', join(routes_dir, 'working-on-your-project.tsx')),
  route('result', join(routes_dir, 'result.tsx')),
  route('sitemap', join(routes_dir, 'sitemap.tsx')),
] satisfies RouteConfig;
