'use strict'; 

const {ExitCode} = require(`../../constants`); 
const {generateOffers, makeMock} = require(`../cli/utils`); 
const DEFAULT_COUNT = 1; 
const MAX_COUNT = 1000;
module.exports = { 
    name: `--generate`, 
    run(userIndex) { 
        const [count] = userIndex; 
        if (count > MAX_COUNT) { 
            console.error(`Не больше ${MAX_COUNT} объявлений. Процесс завершен с ошибкой ${ExitCode.error}`); 
            process.exit(ExitCode.error); 
        } else {
            const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT; 
            const content = JSON.stringify(generateOffers(countOffer));
            makeMock(content);
            process.exit(ExitCode.success);
        }
    } 
};
