'use strict';

const help = require(`../cli/help`);
const generate = require(`../cli/generate`);
const version = require(`../cli/version`);
const Cli = {
    [generate.name]: generate,
    [help.name]: help,
    [version.name]: version,
};

module.exports = {
    Cli,
};
