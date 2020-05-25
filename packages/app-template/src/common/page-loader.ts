export const pageLoader = (src: string) => import(/* webpackPrefetch: true */ '../../pages/' + src);
pageLoader.dir = 'pages';
export default pageLoader;
