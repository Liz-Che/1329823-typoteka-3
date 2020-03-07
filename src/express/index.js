'use strict';

const express = require(`express`);
const chalk = require(`chalk`);
const router = require(`./routers/index`);

const app = express();
const DEFAULT_PORT = 8080;

app.use(router);
app.listen(DEFAULT_PORT,
    () => console.log(chalk.green(`Server running on port 8080`))
);
