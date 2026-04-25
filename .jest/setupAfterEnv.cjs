'use strict';

const { MessageChannel } = require('node:worker_threads');
const { TextEncoder, TextDecoder } = require('node:util');

global.MessageChannel = MessageChannel;
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
