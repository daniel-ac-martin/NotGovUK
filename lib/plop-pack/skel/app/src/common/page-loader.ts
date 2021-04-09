export const pageLoader = require.context('./pages', true, /\.([jt]sx?|html)$/i, 'sync');
export default pageLoader;
