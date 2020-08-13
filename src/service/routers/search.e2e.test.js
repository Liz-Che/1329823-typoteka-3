'use strict';

const request = require(`supertest`);
const {getServer} = require(`../api/api-server`);
const {HttpCode} = require(`../../constants`);
const {getMockData} = require(`../lib/get-mock-data`);

let server;
let mockData;

beforeAll(async () => {
  server = await getServer();
  mockData = await getMockData();
});

describe(`Check REST API to work with search`, () => {

  test(`Get empty article array`, async () => {
    const res = await request(server).get(`/api/search`).query({query: `Text test`});
    expect(res.statusCode).toBe(HttpCode.OK);
  });

  test(`Get searched articles array`, async () => {
    const articleTitle = mockData[5].title;
    const res = await request(server).get(`/api/search`).query({query: articleTitle});
    expect(res.statusCode).toBe(HttpCode.OK);
  });

  test(`Search ends with status code 400`, async () => {
    const res = await request(server).get(`/api/search`).query({param: `Сдам`});
    expect(res.statusCode).toBe(400);
  });

});
