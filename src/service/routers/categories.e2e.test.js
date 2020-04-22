'use strict';

const request = require(`supertest`);
const server = require(`./index`);

describe(`Check REST API to work with caterories`, () => {
  test(`Getting all categories`, async () => {
    const res = await request(server).get(`/api/categories`);
    expect(res.statusCode).toBe(200);
  });
});
