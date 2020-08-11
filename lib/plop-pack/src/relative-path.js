'use strict';

const { resolve } = require('path');

module.exports = (...baseDir) => (...path) => resolve(...baseDir, ...path);
