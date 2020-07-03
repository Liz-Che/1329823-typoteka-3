'use strict';

const axios = require(`axios`);
const createAPI = () => {

  const api = axios.create({
    baseURL: `http://localhost:3000/api`,
    timeout: 3000
  });
  const onSuccess = (response) => {
    return response.data;
  };
  api.interceptors.response.use(onSuccess);
  return api;
};

module.exports = {createAPI};
