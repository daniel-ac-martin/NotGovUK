// Jest config for running the integration tests.
// (Based on CRA's config.)

const craJestConfigDir = '<rootDir>/node_modules/react-scripts/config/jest/';

module.exports = {
    preset: 'jest-puppeteer',

    roots: ['<rootDir>/src'],

    setupFilesAfterEnv: ['./src/setupIntegrationTests.ts'],
    testMatch: [
      '<rootDir>/src/**/__itests__/**/*.{js,jsx,ts,tsx}',
      '<rootDir>/src/**/*.itest.{js,jsx,ts,tsx}'
    ],
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': craJestConfigDir + 'babelTransform.js',
      '^.+\\.css$': craJestConfigDir + 'cssTransform.js',
      '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': craJestConfigDir + 'fileTransform.js'
    },
    transformIgnorePatterns: [
      'node_modules/(?!(@storybook)/)',
      '^.+\\.module\\.(css|sass|scss)$',
    ],
    watchPlugins: [
      'jest-watch-typeahead/filename',
      'jest-watch-typeahead/testname'
    ]
};
