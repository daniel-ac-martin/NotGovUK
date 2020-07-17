'use strict';

const baseConfig = require('../../jest.config.base');
const path = require('path');

const config = {
  ...baseConfig,
  //preset: 'jest-puppeteer',
  setupFilesAfterEnv: [
    path.resolve(__dirname, 'setup-tests.ts')
  ],
  testMatch: [
    '<rootDir>/*.test.{js,ts}'
  ]
};

module.exports = config;
