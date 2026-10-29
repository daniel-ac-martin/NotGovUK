'use strict';

const { TestEnvironment: _TestEnvironment } = require('jest-environment-jsdom');

// APIs that jsdom lacks, which we borrow from Node
const nodeGlobals = [
  'AbortController', // Must match Request's, or it rejects our signals
  'AbortSignal',     // (As above)
  'Headers',         // Fetch API
  'Request',         // Fetch API; react-router's data routers create these
  'Response',        // Fetch API
  'TextDecoder',     // Used by react-dom/server and react-router
  'TextEncoder',     // (As above)
  'fetch'            // Fetch API
];

class TestEnvironment extends _TestEnvironment {
  constructor(...args) {
    super(...args);

    nodeGlobals.forEach(name => {
      this.global[name] = globalThis[name];
    });
  }
}

module.exports = TestEnvironment;
