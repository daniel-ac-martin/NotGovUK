process.env['MODE'] = 'serverless';
process.env['NODE_ENV'] = 'production';
export const { handler } = await import('./dist/server/index.js');
