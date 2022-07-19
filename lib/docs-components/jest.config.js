import baseConfig from '../../jest.config.base.js';

const config = {
  ...baseConfig,
  collectCoverageFrom: [
    '<rootDir>/src/**.{ts,tsx}',
  ],
  testMatch: [
    '<rootDir>/spec/**.{ts,tsx}'
  ]
};

export default config;
