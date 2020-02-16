'use strict'; 

const {ExitCode} = require(`../../constants`); 
const {generateOffers} = require(`../cli/utils`); 
const fs = require(`fs`);
const DEFAULT_COUNT = 1; 
const MAX_COUNT = 1000;
const FILE_NAME = `mocks.json`;

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
            fs.writeFileSync(FILE_NAME,content,(err) =>{
                if (err){ 
                    console.error(`Не удалось записать данные в файл`);
                    process.exit(ExitCode.error);
                }
                console.log(`Файл записан!`);
                process.exit(ExitCode.success);
            });
            process.exit(ExitCode.success);
        }
    } 
};
