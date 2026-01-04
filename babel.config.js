'use strict';

const jsxPragma = 'h';

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
        targets: { node: '14' }
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
