'use strict';

const level = process.env.LOG_LEVEL;
const logger = require(`pino`)({
  name: `pino-and-express`,
  level: level ? level.trim() : `info`,
});

module.exports = {
  logger,
  getLogger(options = {}) {
    return logger.child(options);
  }
};
