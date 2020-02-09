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
            console.error(`Не больше ${MAX_COUNT} объявлений`); 
            process.exit(ExitCode.fail); 
        } 
        const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT; 
        const content = JSON.stringify(generateOffers(countOffer));
        makeMock(content);
        if (!makeMock){
            console.error(`0`);
        }
        console.log(`1`);
        process.exit(ExitCode.success); 
    } 
};
