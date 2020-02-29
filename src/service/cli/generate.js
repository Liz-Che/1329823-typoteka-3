'use strict'; 

const {ExitCode} = require(`../../constants`); 
const {getReandomInt, shuffle} = require(`../cli/utils`);
const chalk = require(`chalk`);
const moment = require(`moment`); 
const fs = require(`fs`).promises;
const DEFAULT_COUNT = 1; 
const MAX_COUNT = 1000;
const FILE_NAME = `mocks.json`;
const FILE_SENTENCES_PATH = `./data/sentences.txt`;
const FILE_TITLES_PATH = `./data/titles.txt`;
const FILE_CATEGORIES_PATH = `./data/categories.txt`;


const createdRandomDate = () => {
  const dateNow = moment().valueOf();
  const threeMonthAgo = moment().subtract(3, `months`).valueOf();
  return moment(getReandomInt(threeMonthAgo, dateNow)).format(`YYYY:MM:DD HH:mm:ss`);
};

const generateOffers = (count, titles, sentences,categories) => (
  Array(count).fill({}).map( () => ( {
    title: titles[getReandomInt(0, titles.length - 1)],
    announce: shuffle(sentences).slice(0,5).join(` `), 
    fullText: shuffle(sentences).slice(0, getReandomInt(0, sentences.length - 1)).join(` `),
    createdDate: createdRandomDate(),
    category: [categories[getReandomInt(0, categories.length - 1)]],
  }))
);

const readContent = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, `utf8`);
    return content.split(`\n`).filter(Boolean);
  }
  catch (err) {
    console.error(chalk.red(err));
    return [];
  }
};

module.exports = { 
  name: `--generate`, 
  async run(userIndex) { 
    const [sentences, titles, categories] = await Promise.all([
      readContent(FILE_SENTENCES_PATH),
      readContent(FILE_TITLES_PATH),
      readContent(FILE_CATEGORIES_PATH),
    ]);

    const [count] = userIndex; 
    if (count > MAX_COUNT) { 
      console.error(chalk.red(`Не больше ${MAX_COUNT} объявлений. Процесс завершен с ошибкой ${ExitCode.error}`)); 
      process.exit(ExitCode.error); 
    } 

    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT; 
    const content = JSON.stringify(generateOffers(countOffer,titles,sentences,categories));

    try {
      await fs.writeFile(FILE_NAME,content);
      console.log(chalk.green(`Файл записан!`));
      process.exit(ExitCode.success);
    } catch {
      console.error(chalk.red(`Не удалось записать данные в файл`));
      process.exit(ExitCode.error);
    }
  }
};
