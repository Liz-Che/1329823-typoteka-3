'use strict';

const appRouter = require(`../routers/index`);
const {logger} = require(`../logger`);
const DEFAULT_PORT = 3000;

module.exports = {
  name: `--server`,
  run() {
    const envPort = process.env.PORT;
    appRouter.listen(envPort ? envPort.trim() : DEFAULT_PORT, () => {
      logger.info(`Run server on port ${envPort || DEFAULT_PORT}`);
    }).on(`error`, (err) => {
      logger.error(`Server can't start. Error ${err}`);
    });
  },
};
