const axios = require('axios');

const utils = {
  get: async (endpoint) => {
    return await axios.get(endpoint);
  },
  
};

module.exports = utils;
