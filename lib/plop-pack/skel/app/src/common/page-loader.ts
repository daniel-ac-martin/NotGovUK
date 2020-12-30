export const pageLoader = require.context('./pages', true, /\.[jt]sx?$/i, 'lazy');
export default pageLoader;
