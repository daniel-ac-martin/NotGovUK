import { extendGenerator, relativePath } from '@not-govuk/plop-pack-internal';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const plopPackInternal = require.resolve('@not-govuk/plop-pack-internal');
const rel = relativePath(__dirname, '..', 'skel');

const plopFunction = async (plop) => {
  const parent = plopPackInternal;

  plop.load(plopPackInternal, undefined, { actionTypes: true, generators: false, helpers: true, partials: false });

  plop.setGenerator(
    'app',
    await extendGenerator(plop, parent, 'app', {
      prompts: [
        {
          type: 'confirm',
          name: 'govuk',
          message: 'Will this be hosted on service.gov.uk?:',
          default: false
        }
      ],
      actions: [
        {
          type: 'copy',
          destination: 'apps/{{{name}}}/src/',
          source: rel('app/src/'),
          overwrite: true
        },
        {
          type: 'add',
          path: 'apps/{{{name}}}/src/common/page-wrap.tsx',
          templateFile: rel('app/src/common/page-wrap.tsx.hbs'),
          force: true
        },
        {
          type: 'merge',
          path: 'apps/{{{name}}}/package.json',
          templateFile: rel('app/package.json.hbs')
        }
      ]
    })
  );

  plop.setGenerator(
    'component',
    await extendGenerator(plop, parent, 'component', {
      prompts: [
      ],
      actions: [
      ]
    })
  );

  plop.setGenerator(
    'lib',
    await extendGenerator(plop, parent, 'lib', {
      prompts: [
      ],
      actions: [
      ]
    })
  );

  plop.setDefaultInclude({ actionTypes: true, generators: true, helpers: true });
};

export default plopFunction;
