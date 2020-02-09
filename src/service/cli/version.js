'use strict';

const packageJsonFile = require(`../../../package.json`);
const version = packageJsonFile.version;

module.export = {
    name: `--version`,
    run(){
        console.info(version);
    }
};
