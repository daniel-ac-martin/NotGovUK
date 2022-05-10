'use strict';

const baseConfig = require('../../jest.config.base');

const config = {
  ...baseConfig,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.js',
  ],
  testMatch: [
    '<rootDir>/spec/**/*.js'
  ]
};

module.exports = config;
