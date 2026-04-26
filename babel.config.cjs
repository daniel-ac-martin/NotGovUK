'use strict';

const jsxPragma = 'h';

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: true,
        targets: { node: '20' }
      }
    ],
    [
      '@babel/preset-react',
      {
        development: true,
        pragma: jsxPragma,
        pragmaFrag: 'Fragment',
        runtime: 'classic',
        useBuiltIns: true
      }
    ],
    [
      '@babel/preset-typescript',
      {
        allowDeclareFields: true,
        jsxPragma
      }
    ]
  ],
  plugins: [
    '@babel/plugin-transform-export-namespace-from'
  ]
};
