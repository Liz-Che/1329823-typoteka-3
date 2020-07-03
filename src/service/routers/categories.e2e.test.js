'use strict';

const request = require(`supertest`);
const {HttpCode} = require(`../../constants`);
const {getServer} = require(`../api/api-server`);

describe(`Check REST API to work with caterories`, () => {
  test(`Getting all categories`, async () => {
    const server = await getServer();
    const res = await request(server).get(`/api/categories`);
    expect(res.statusCode).toBe(HttpCode.OK);
  });
});
