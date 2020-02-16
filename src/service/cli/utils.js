'use strict';

const moment = require(`moment`);
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
            //ANNOUNCE - это константа из data.js, хрянящая в себе предложения, из которых формируются уже 
            //announce и fullText
            // "На данном этапе не требуется, чтобы полный текст включал предложения, которые использовались в анонсе."
            //Это цитата из задания. 
            announce: shuffle(ANNOUNCE).slice(0,5).join(` `), //5 записей
            //ПОЛНЫЙ ТЕКСТ - произвольное количество (это означает что от 0 до количества записей в массиве, жаль в минус уйти нельзя) и не сказано, что больше анонса, извините, но лучше тогда задание формулируйте.
            fullText: shuffle(ANNOUNCE).slice(0,getReandomInt(0, ANNOUNCE.length - 1)).join(` `), 
            createdDate: createdRandomDate(),
            category: [CATEGORY[getReandomInt(0,CATEGORY.length-1)]],
        }))
);

module.exports = {generateOffers};

