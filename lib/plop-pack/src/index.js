import { extendGenerator, relativePath } from '@react-foundry/plop-pack';
import { createRequire } from 'node:module';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const __dirname = dirname(fileURLToPath(import.meta.url));

const plopPackInternal = require.resolve('@react-foundry/plop-pack');
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
          destination: 'apps/{{{name}}}/public/',
          source: rel('app/public/'),
          overwrite: true
        },
        {
          type: 'copy',
          destination: 'apps/{{{name}}}/src/',
          source: rel('app/src/'),
          overwrite: true
        },
        {
          type: 'add',
          path: 'apps/{{{name}}}/src/app/root.tsx',
          templateFile: rel('app/src/app/root.tsx.hbs'),
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
