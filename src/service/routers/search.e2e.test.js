'use strict';

const fs = require(`fs`).promises;
const request = require(`supertest`);
const server = require(`./index`);
const {MOCK_FILE_NAME} = require(`../../constants`);

describe(`Check REST API to work with search`, () => {
  let mockOffer = null;
  beforeAll(async () => {
    mockOffer = JSON.parse((await fs.readFile(MOCK_FILE_NAME)).toString())[0];
  });
  test(`Search posts`, async () => {
    const res = await request(server).get(`/api/search?query=${encodeURIComponent(mockOffer.title)}`);
    expect(res.statusCode).toBe(200);
  });
});
