'use strict';

const request = require(`supertest`);
const {HttpCode} = require(`../../constants`);
const {getServer} = require(`../api/api-server`);
const {getMockData} = require(`../lib/get-mock-data`);

const newPostData = {
  title: `Новинки музыки`,
  announce: `Простые ежедневные упражнения помогут достичь успеха.`,
  fullText: `Тяжело найти качественную музыку`,
  createdDate: `2020-05-07 02:23`,
  category: [`Музыка`],
  picture: ``,
  comments: []
};

const updatedPostData = {
  title: `Новинки автопрома`,
  announce: `Простые ежедневные упражнения помогут достичь успеха.`,
  fullText: `Тяжело найти хороший б/у автомобиль`,
  createdDate: `2020-04-07 20:25`,
  category: [`Авто`],
  picture: ``,
  comments: []
};


const incorrectPostData = {
  announce: `Простые ежедневные упражнения помогут достичь успеха.`,
  fullText: `Тяжело найти качественную музыку`,
  createdDate: `2020-04-17 30:25`,
  category: [`Тесты`],
  picture: ``,
  comments: []
};

let server;
let mockData;

beforeAll(async () => {
  server = await getServer();
  mockData = await getMockData();
});

describe(`Check REST API to work with article`, () => {

  describe(`Get all article`, () => {

    test(`Get all article`, async () => {
      const res = await request(server).get(`/api/articles`);
      expect(res.statusCode).toBe(HttpCode.OK);
    });
  });

  describe(`Get article by id`, () => {

    test(`Get article by ID`, async () => {
      const articleId = mockData[0].id;
      const res = await request(server).get(`/api/articles/${articleId}`);
      expect(res.statusCode).toBe(HttpCode.OK);
    });

    test(`Check nonexistent article`, async () => {
      const articleId = `OOOOOO`;
      const res = await request(server).get(`/api/articles/${articleId}`);
      expect(res.statusCode).toBe(HttpCode.NOT_FOUND);
    });
  });

  describe(`Creating a new article`, () => {

    test(`Creating a new data article`, async () => {
      const res = await request(server).post(`/api/articles`).send(newPostData);
      expect(res.statusCode).toBe(HttpCode.CREATED);
    });

    test(`Creating a new article without`, async () => {
      const res = await request(server).post(`/api/articles`).send(incorrectPostData);
      expect(res.statusCode).toBe(400);
    });
  });

  describe(`Get article comments`, () => {

    test(`Getting comments from the article`, async () => {
      const articleId = mockData[3].id;
      const res = await request(server).get(`/api/articles/${articleId}/comments`);
      expect(res.statusCode).toBe(HttpCode.OK);
    });

    test(`Getting comments from nonexistent offer`, async () => {
      const articleId = `000fff`;
      const res = await request(server).get(`/api/articles/${articleId}/comments`);
      expect(res.statusCode).toBe(HttpCode.NOT_FOUND);
    });
  });

  describe(`Create a new article comment`, () => {

    test(`Creating new comment at article`, async () => {
      const articleId = mockData[0].id;
      const commentData = {text: `New test comment`};
      const res = await request(server).post(`/api/articles/${articleId}/comments`).send(commentData);
      expect(res.statusCode).toBe(HttpCode.CREATED);
    });

    test(`Creating new comment without data`, async () => {
      const articleId = mockData[0].id;
      const commentData = {message: `New test comment`};
      const res = await request(server).post(`/api/articles/${articleId}/comments`).send(commentData);
      expect(res.statusCode).toBe(HttpCode.BED_REQUEST);
    });

    test(`Creating new comment at nonexistent offer`, async () => {
      const articleId = `000fff`;
      const commentData = {text: `New test comment`};
      const res = await request(server).post(`/api/articles/${articleId}/comments`).send(commentData);
      expect(res.statusCode).toBe(HttpCode.NOT_FOUND);
    });
  });

  describe(`Delete article comment`, () => {

    test(`Delete one comment from the offer`, async () => {
      const articleId = mockData[0].id;
      const articleComment = mockData[0].comments[0];
      const commentId = articleComment.id;
      const res = await request(server).delete(`/api/articles/${articleId}/comments/${commentId}`);
      expect(res.statusCode).toBe(HttpCode.OK);
    });

    test(`Delete comment from the nonexistent article`, async () => {
      const articleId = `000fff`;
      const commentId = mockData[0].comments[0].id;
      const res = await request(server).delete(`/api/articles/${articleId}/comments/${commentId}`);
      expect(res.statusCode).toBe(HttpCode.NOT_FOUND);
    });

    test(`Delete nonexistent comment from the offer`, async () => {
      const articleId = mockData[0].id;
      const commentId = `oooxxx`;
      const res = await request(server).delete(`/api/articles/${articleId}/comments/${commentId}`);
      expect(res.statusCode).toBe(HttpCode.NOT_FOUND);
    });
  });

  describe(`Update article by ID`, () => {

    test(`Update article`, async () => {
      const articleId = mockData[0].id;
      const res = await request(server).put(`/api/articles/${articleId}`).send(updatedPostData);
      expect(res.statusCode).toBe(HttpCode.OK);
    });

    test(`Update offer without data`, async () => {
      const articleId = mockData[0].id;
      const res = await request(server).put(`/api/articles/${articleId}`).send({});
      expect(res.statusCode).toBe(400);
    });

    test(`Update nonexistent offer`, async () => {
      const articleId = `000fff`;
      const res = await request(server).put(`/api/articles/${articleId}`).send(newPostData);
      expect(res.statusCode).toBe(HttpCode.NOT_FOUND);
    });
  });

  describe(`Delete article by ID `, () => {
    test(`Delete article`, async () => {
      const articleId = mockData[0].id;
      const res = await request(server).delete(`/api/articles/${articleId}`);
      expect(res.statusCode).toBe(HttpCode.OK);
    });

    test(`Delete nonexistent article`, async () => {
      const articleId = `000fff`;
      const res = await request(server).delete(`/api/articles/${articleId}`);
      expect(res.statusCode).toBe(HttpCode.NOT_FOUND);
    });
  });

});
