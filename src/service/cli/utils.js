'use strict';

const moment = require(`moment`);
const fs = require(`fs`);
const { TITLES,
        ANNOUNCE,
        CATEGORY,
    } = require(`./data`);

const getReandomInt = (min,max) => {
    min = Math.ceil(min);
    max = Math.ceil(max);
    return Math.floor(Math.random()*(max-min+1))+min;
};

const createdRandomDate = () => {
    const dateNow = moment().valueOf();
    const threeMonthAgo = moment().subtract(3, `months`).valueOf();
    return moment(getReandomInt(threeMonthAgo, dateNow)).format(`YYYY:MM:DD HH:mm:ss`);
  };

const shuffle = (array) => {
    for (let index = array.length -1;index>0;index--){
        const randomPos = Math.floor(Math.random()*index);
        [array[index],array[randomPos]] = [array[randomPos], array[index]];
    }
    return array;
};

const generateOffers = (count) => (
    Array(count).fill({}).map( () => (
        {
            title: TITLES[getReandomInt(0,TITLES.length-1)],
            announce: shuffle(ANNOUNCE).slice(0,5).join(` `),
            fullText: shuffle(ANNOUNCE).slice(1,getReandomInt(0, ANNOUNCE.length - 1)).join(` `),
            createdDate: createdRandomDate(),
            category: [CATEGORY[getReandomInt(0,CATEGORY.length-1)]],
        }))
);

const makeMock = (data) => { 
    const FILE_NAME = `mocks.json`;
    fs.writeFileSync(FILE_NAME,data,(err) =>{
        if (err){ 
            console.error(`Не удалось записать данные в файл`); 
        }
        console.log(`Файл записан!`);
    });
};

module.exports = {getReandomInt, shuffle, generateOffers,makeMock};

