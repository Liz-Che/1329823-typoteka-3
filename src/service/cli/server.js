'use strict';

const {getServer} = require(`../api/api-server`);
const {getLogger} = require(`../logger`);
const DEFAULT_PORT = 3000;

module.exports = {
  name: `--server`,
  async run() {
    const envPort = process.env.PORT;
    const server = await getServer();
    const logger = getLogger();
    server.listen(envPort ? envPort.trim() : DEFAULT_PORT, () => {
      logger.info(`Run server on port ${envPort || DEFAULT_PORT}`);
    }).on(`error`, (err) => {
      logger.error(`Server can't start. Error ${err}`);
    });
  },
};
