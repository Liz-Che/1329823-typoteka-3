'use strict';

const packageJsonFile = require(`../../../package.json`);
module.export = {
    name: `--version`,
    run(){
        const version = packageJsonFile.version;
        console.info(version);
    }
};
