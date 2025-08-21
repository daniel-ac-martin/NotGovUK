import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { generateConfigs } from '@not-govuk/webpack-config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const entry = (
  process.env.NODE_ENV === 'development'
    ? 'dev'
    : 'index'
);

const webpackConfig = generateConfigs({
  baseDir: __dirname,
  docs: true,
  entry: {
    client: './src/client/index.ts',
    server: `./src/server/${entry}.ts`
  },
  outDir: './dist'
});

export default webpackConfig;
