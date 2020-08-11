'use strict';

const plopActionMessage = (answers, config, plop) => plop.renderString(config.content, answers);

module.exports = plopActionMessage;
