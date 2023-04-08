const utils = require('../utils/utils');

const baseEndpoints = [
  'https://api.binance.com',
  'https://api1.binance.com',
  'https://api2.binance.com',
  'https://api3.binance.com',
  'https://api4.binance.com',
];

const api = {
  ping: async () => {
    const endpoint = '/api/v3/ping';
    baseEndpoints.forEach(async (baseEndpoint) => {
      response = await utils.get(`${baseEndpoint}${endpoint}`);
      console.log(response?.status);
    });
  },
};

module.exports = api;
