'use strict';

const { MessageChannel } = require('node:worker_threads');
const { TextEncoder, TextDecoder } = require('node:util');

const openChannels = [];

class TrackedMessageChannel extends MessageChannel {
  constructor() {
    super();
    openChannels.push(this);
  }
}

afterAll(() => {
  let channel;

  while ((channel = openChannels.pop())) {
    channel.port1.close();
    channel.port2.close();
  }
});

global.MessageChannel = TrackedMessageChannel;
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
