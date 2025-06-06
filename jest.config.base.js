'use strict';

const path = require('path');

/** @typedef {import('ts-jest')} */
/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  preset: 'ts-jest/presets/js-with-babel',
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    url: 'http://localhost/'
  },
  setupFilesAfterEnv: [path.resolve(__dirname, '.jest', 'setupAfterEnv.js')],
  moduleNameMapper: {
    '\\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': path.resolve(__dirname, '.jest', 'mocks', 'file.js'),
    '\\.(css|scss|sass|less)$': path.resolve(__dirname, '.jest', 'mocks', 'style.js')
  },
  moduleDirectories: [
    'node_modules'
  ],
  transform: {
    "^.+\\.jsx?$": 'babel-jest',
    "^.+\\.tsx?$": ['ts-jest', {
      tsconfig: path.resolve(__dirname, 'tsconfig.jest.json'),
      useESM: false
    }]
  },
  transformIgnorePatterns: [
    'node_modules/\.pnpm/(?!@)'
  ],
};

module.exports = config;
