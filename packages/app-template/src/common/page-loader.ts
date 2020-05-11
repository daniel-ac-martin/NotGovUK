export const pageLoader = (src: string) => import('../../pages/' + src);
pageLoader.dir = 'pages';
export default pageLoader;
