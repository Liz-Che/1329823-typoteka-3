'use strict'; 

const {ExitCode} = require(`../../constants`); 
const {generateOffers} = require(`../cli/utils`);
const chalk = require(`chalk`); 
const fs = require(`fs`).promises;
const DEFAULT_COUNT = 1; 
const MAX_COUNT = 1000;
const FILE_NAME = `mocks.json`;

module.exports = { 
    name: `--generate`, 
    async run(userIndex) { 
        const [count] = userIndex; 
        if (count > MAX_COUNT) { 
            console.error(chalk.red(`Не больше ${MAX_COUNT} объявлений. Процесс завершен с ошибкой ${ExitCode.error}`)); 
            process.exit(ExitCode.error); 
        } 
        const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT; 
        const content = JSON.stringify(generateOffers(countOffer));
        try {
            await fs.writeFile(FILE_NAME,content);
            console.log(chalk.green(`Файл записан!`));
            process.exit(ExitCode.success);
        }
        catch{
            console.error(chalk.red(`Не удалось записать данные в файл`));
            process.exit(ExitCode.error);
        }
    } 
};
