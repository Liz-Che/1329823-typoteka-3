'use strict';

const fs = require(`fs`).promises;
const request = require(`supertest`);
const server = require(`./index`);
const {MOCK_FILE_NAME} = require(`../../constants`);

describe(`Check REST API to work with post`, () => {
  const FAKE_POST_ID = `OOOOOO`;
  const FAKE_COMMENT_ID = `OOOOOO`;
  let mockPost = null;
  let REAL_POST_ID = null;
  let REAL_COMMENT_ID = null;

  beforeAll(async () => {
    mockPost = JSON.parse((await fs.readFile(MOCK_FILE_NAME)).toString())[0];
    REAL_POST_ID = mockPost.id;
    REAL_COMMENT_ID = mockPost.comments[0].id;
  });

  test(`Check all post`, async () => {
    const res = await request(server).get(`/api/articles`);
    expect(res.statusCode).toBe(200);
  });

  test(`Check post by ID`, async () => {
    const res = await request(server)
      .get(`/api/articles/${REAL_POST_ID}`);
    expect(res.statusCode).toBe(200);
  });

  test(`Check nonexistent post`, async () => {
    const res = await request(server)
      .get(`/api/articles/${FAKE_POST_ID}`);
    expect(res.statusCode).toBe(400);
  });

  test(`Creating a new post`, async () => {
    const res = await request(server)
      .post(`/api/articles`)
      .send(mockPost);
    expect(res.statusCode).toBe(200);
  });

  test(`Creating a new post without data`, async () => {
    const res = await request(server)
      .post(`/api/articles`)
      .send({});
    expect(res.statusCode).toBe(400);
  });

  test(`Update post`, async () => {
    const res = await request(server)
      .get(`/api/articles/${REAL_POST_ID}`);
    expect(res.statusCode).toBe(200);
  });

  test(`Update nonexistent post`, async () => {
    const res = await request(server)
      .get(`/api/articles/${FAKE_POST_ID}`);
    expect(res.statusCode).toBe(400);
  });

  test(`Delete post`, async () => {
    const res = await request(server)
      .delete(`/api/articles/${REAL_POST_ID}`);
    expect(res.statusCode).toBe(200);
  });

  test(`Delete nonexistent post`, async () => {
    const res = await request(server)
      .delete(`/api/articles/${FAKE_POST_ID}`);
    expect(res.statusCode).toBe(204);
  });

  test(`Getting comments from the post`, async () => {
    const res = await request(server)
      .get(`/api/articles/${REAL_POST_ID}/comments`);
    expect(res.statusCode).toBe(200);
  });

  test(`Getting comments from nonexistent post`, async () => {
    const res = await request(server)
      .get(`/api/articles/${FAKE_POST_ID}/comments`);
    expect(res.statusCode).toBe(400);
  });

  test(`Delete comment from the post`, async () => {
    const res = await request(server)
      .delete(`/api/articles/${REAL_POST_ID}/comments/${REAL_COMMENT_ID}`);
    expect(res.statusCode).toBe(200);
  });

  test(`Delete comment from the nonexistent post`, async () => {
    const res = await request(server)
      .delete(`/api/articles/${FAKE_POST_ID}/comments/${REAL_COMMENT_ID}`);
    expect(res.statusCode).toBe(400);
  });

  test(`Delete nonexistent comment from the post`, async () => {
    const res = await request(server)
      .delete(`/api/articles/${REAL_POST_ID}/comments/${FAKE_COMMENT_ID}`);
    expect(res.statusCode).toBe(400);
  });

  test(`Creating new comment at post`, async () => {
    const res = await request(server)
      .put(`/api/articles/${REAL_POST_ID}/comments`)
      .send({id: 1, text: `New comment text.`});
    expect(res.statusCode).toBe(200);
  });

  test(`Creating new comment at nonexistent post`, async () => {
    const res = await request(server)
      .put(`/api/articles/${FAKE_POST_ID}/comments`)
      .send({id: 1, text: `New comment text.`});
    expect(res.statusCode).toBe(400);
  });

  test(`Creating new comment without data`, async () => {
    const res = await request(server)
      .put(`/api/articles/${REAL_POST_ID}/comments`)
      .send({});
    expect(res.statusCode).toBe(400);
  });
});
