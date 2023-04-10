const axios = require('axios');

const utils = {
  get: async (endpoint) => {
    return await axios.get(endpoint);
  },
  getFile: async (endpoint) => {
    return await axios.get(endpoint, { responseType: 'stream' });
  },
};

module.exports = utils;
