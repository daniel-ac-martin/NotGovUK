'use strict';

const relativePath = require('./relative-path');

module.exports = dir => relativePath(__dirname, '..', 'skel', dir);
