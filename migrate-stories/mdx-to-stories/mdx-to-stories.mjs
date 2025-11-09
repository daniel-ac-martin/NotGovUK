#! /bin/env node

import fs from 'node:fs/promises';
import prettier from 'prettier';
import { toEstree } from 'hast-util-to-estree';
import { recast } from 'storybook/internal/babel';
import { loadCsf, printCsf } from '@storybook/csf-tools';
import { compile  } from '@mdx-js/mdx';
import { plugin, postprocess } from '@storybook/mdx2-csf';
import { transform2 } from './csf-2-to-3.mjs';

const prog = process.argv[1];
const args = process.argv.slice(2);
const [ mdx ] = args;

const usage = () => {
  console.log(`Usage: ${prog} <MDX_FILE>`);
};

if (!mdx) {
  console.error('Error: No file provided.');
  usage();
  process.exit(1);
}

const objStringify = (s) => (
  JSON.stringify(s)
    .replace(':null', ':undefined')
);

const file = await fs.readFile(mdx)

try {
  const context = { exports: '', toEstree };
  const jsxSource = (await compile(file, {
    format: 'mdx',
    jsx: true,
    providerImportSource: '@mdx-js/react',
    rehypePlugins: [[plugin, context]]
  })).toString();
  // console.log('jsxSource:');
  // console.log(jsxSource);
  // console.log('context:');
  // console.log(context);
  const ppRes = postprocess(jsxSource, context.exports);
  // console.log('ppRes:');
  // console.log(ppRes);
  const jsxCsf2Source = (ppRes.split('/* ========= */')[1]).replace(/\{"([^"]*)"\}/g, '$1');
  // console.log('jsxCsf2Source:');
  // console.log(jsxCsf2Source);
  const makeTitle = (userTitle) => userTitle || 'default';
  const jsxCsf2 = await loadCsf(jsxCsf2Source, { makeTitle }).parse();

  // console.log('jsCsf2:');
  // console.log(jsCsf2);

  const jsxCsf3Pre = await transform2(jsxCsf2, {
    path: mdx,
    source: jsxCsf2Source
  });
  const jsxCsf3Source = printCsf(jsxCsf3Pre).code;
  // console.log('jsxCsf3Source:');
  // console.log(jsxCsf3Source);

  const csf = await loadCsf(jsxCsf3Source, { makeTitle }).parse();
  // console.log('csf:');
  // console.log(csf);
  // console.log('exports:');
  // console.log(csf._storyExports.standard.init);

  const meta = {
    title: csf._meta.title,
    component: csf._meta.component
  };

  const name2Id = (name) => (
    name === meta.component
      ? 'Primary'
      : (
        name.charAt(0).toUpperCase() +
          name
          .replace(/[_\s]+(.)/g, (match, char) => char.toUpperCase())
          .replace(/[\s\.-]+/g, '')
          .slice(1)
      )
  );

  const stories = Object.values(csf._storyExports);
  let firstStory;
  let primaryStory;
  let _standardStory;
  let storyInfo = {};
  stories.forEach((s) => {
    const name = s.init.properties.filter(e => e.key.name === 'name')[0]?.value.value;
    // console.log(`Analysing '${name}':`);

    if (name) {
      if (firstStory === undefined) {
        firstStory = name;
      }
      if (name === meta.component) {
        primaryStory = name;
      }
      if (name === 'Standard') {
        _standardStory = name;
      }
    }

    let simple = true;
    let args = {};
    let element = s.init.properties.filter(e => e.key.name === 'render')[0]?.value?.body;

    if (meta.component === undefined) {
      simple = false;
    } else {

      while (element !== undefined && element.openingElement?.name.name !== meta.component) {
        simple = false;
        element = element.children.filter((e) => e.type === 'JSXElement')[0];
      }

      if (element?.openingElement?.name.name === meta.component && meta.component !== undefined) {
        const props = element?.openingElement.attributes;
        const children = element?.children;
        // console.log(element);

        props?.forEach((p, i) => {
          const name = p.name.name;
          // console.log(`  Analysing prop '${name}':`);

          if (p.value === null) {
            args[name] = true;
            delete props[i];
          } else {
            let value;
            let factor = 1;

            // console.log(`    Initial type is '${p.value.type}'`);

            if (p.value.type === 'JSXExpressionContainer') {
              value = p.value.expression;

              if (value.type === 'UnaryExpression') {
                value = value.argument;
                factor = -1;
              }
            } else {
              value = p.value;
            }

            // console.log(`    Type is '${value.type}'`);
            switch(value.type) {
            case 'BooleanLiteral':
            case 'StringLiteral':
              args[name] = value.value;
              delete props[i];
              // console.log(`    SUCCESS`);
              break;
            case 'NumericLiteral':
              args[name] = value.value * factor;
              delete props[i];
              // console.log(`    SUCCESS`);
              break;
            default:
              simple = false;
              // console.log(`    FAILURE`);
              // console.log(value);
            }
          }
        });

        if (children?.length === 1) {
          const child = children[0];

          if (child.type === 'JSXText') {
            args['children'] = child.value;
            delete children[0];
            element.closingElement = null;
            element.openingElement.selfClosing = true;
          } else {
            simple = false;
          }
        } else if (children?.length > 1) {
          simple = false;
        }
      }
    }

    storyInfo[name2Id(name)] = {
      args,
      simple
    };
  });
  // console.log('storyInfo:');
  // console.log(storyInfo);
  const standardStory = _standardStory || primaryStory || firstStory;
  const standardArgs = storyInfo[name2Id(standardStory)].args;
  Object.keys(storyInfo).forEach(i => {
    const args = storyInfo[i].args;
    const keys = Object.keys({...standardArgs, ...args});
    let diff = {};

    keys.forEach((i) => {
      const arg = args[i];

      if (arg !== standardArgs[i]) {
        diff[i] = (
          arg === undefined
            ? null
            : arg
        );
      }
    });

    storyInfo[i]['argsDiff'] = diff;
  });
  // console.log('storyInfo:');
  // console.log(storyInfo);

  const transformStory = (s) => {
    // console.log('transformStory():');
    // console.log(s.init.properties);
    const name = s.init.properties.filter(e => e.key.name === 'name')[0]?.value.value;
    const id = name2Id(name);
    const info = storyInfo[id];
    // console.log(s.id.name);
    // console.log(name);
    // console.log(id);

    if (name) {
      s.id.name = id;
    }

    s.init.properties.forEach((v, i) => {
      if (v.key.name === 'name' && name !== id && id !== 'Primary') {
      } else if (v.key.name !== 'render' || info.simple) {
        delete s.init.properties[i];
      }
    });
  };

  stories.forEach(transformStory);

  // Transform meta
  const metaAllowed = ['component', 'title', 'parameters'];
  const paramAllowed = ['chromatic', 'description', 'image'];
  csf._metaStatement.declarations[0].id.name = 'meta';
  csf._metaNode.properties.forEach((v, i) => {
    if (v.key.name === 'parameters') {
      v.value.properties.forEach((v2, i2) => {
        if (!paramAllowed.includes(v2.key.name)) {
          delete v.value.properties[i2];
        }
      })
    }

    if (!metaAllowed.includes(v.key.name)) {
      delete csf._metaNode.properties[i];
    }
  });

  const messyMeta = (
    recast.print(csf._metaStatement, {})
      .code
      .split('\n')
      .filter(line => line.trim() !== '')
      .join('\n')
      .replace('};', '  args: ' + objStringify(standardArgs) + '\n} satisfies Meta<typeof ' + meta.component + '>;')
  );
  // console.log('messyMeta:');
  // console.log(messyMeta);
  const messyStories = (
    Object.values(csf._storyStatements)
      .map(e => {
        const id = e.declaration.declarations[0].id.name;
        const args = storyInfo[id]?.argsDiff || {};

        return (
          recast.print(e, {})
            .code
            .split('\n')
            .filter(line => line.trim() !== '')
            .join('\n')
            .replace(' = {', ': Story = {\n  args: ' + objStringify(args) + ',')
            .replace('render: ()', 'render: ({ ...props })')
            .replace(new RegExp('<' + meta.component + '([ \n\t/>])'), '<' + meta.component + '{ ...props }$1')
        );
      })
      .join('\n\n')
  );
  // console.log('messyStories:');
  // console.log(messyStories);

  const prettierConfig = {
    parser: 'babel-ts',
    semi: true,
    tabWidth: 2,
    singleQuote: true,
    jsxSingleQuote: false,
    trailingComma: 'none',
    bracketSameLine: false,
  };
  const tidyMeta = await prettier.format(messyMeta, prettierConfig);
  // console.log('tidyMeta:');
  // console.log(tidyMeta);
  const tidyStories = await prettier.format(messyStories, prettierConfig);
  // console.log('tidyStories:');
  // console.log(tidyStories);

  const messyOutput = (
    `import type { Meta, StoryObj } from '@storybook/react-vite';\n`
      + '\n'
      + `import { ${meta.component} } from '../src/${meta.component}';\n`
      + '\n'
      + tidyMeta.trim() + '\n'
      + '\n'
      + 'export default meta;\n'
      + 'type Story = StoryObj<typeof meta>;\n'
      + '\n'
      + tidyStories.trim()
  );
  const output = await prettier.format(messyOutput, prettierConfig);
  // console.log('---');
  console.log(output.trim());
} catch (err) {
  console.error(err);
}
