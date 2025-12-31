import type { RouteConfig } from '@react-router/dev/routes';
// import { index, route } from '@react-router/dev/routes';
import { flatRoutes } from '@react-router/fs-routes';

// const routes_dir = 'routes';
// export default [
//   index(routes_dir + '/_index.tsx'),
//   route('data', routes_dir + '/data.tsx'),
//   route('forms', routes_dir + '/forms.tsx'),
//   route('html', routes_dir + '/html.htm'),
//   route('md', routes_dir + '/md.md'),
//   route('mdx', routes_dir + '/mdx.mdx'),
//   route('poc', routes_dir + '/poc.tsx'),
//   route('result', routes_dir + '/result.tsx'),
//   route('search', routes_dir + '/search.tsx'),
//   route('sitemap', routes_dir + '/sitemap.tsx'),
//   route('user-info', routes_dir + '/user-info.tsx'),
// ] satisfies RouteConfig;

export default flatRoutes({
  rootDirectory: 'routes'
}) satisfies RouteConfig;
