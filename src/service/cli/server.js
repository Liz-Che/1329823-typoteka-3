'use strict';

const chalk = require(`chalk`);
const express = require(`express`);
const initRouter = require(`../routers/index`);

const DEFAULT_PORT = 3000;
const app = express();

module.exports = {
  name: `--server`,
  run(args) {
    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;

    app.use(initRouter);
    return app.listen(port,
        () => console.log(chalk.green(`Server started on port ${port}`)));
  },
};
