'use strict';

const express = require(`express`);
const chalk = require(`chalk`);
const router = require(`./routers/index`);
const path = require(`path`);

const app = express();
const DEFAULT_PORT = 8080;

app.use(express.static(`markup`));
app.set(`views`, path.join(__dirname, `templates`));
app.set(`view engine`, `pug`);

app.use(router);
app.listen(DEFAULT_PORT,
    () => console.log(chalk.green(`Server running on port 8080`))
);
