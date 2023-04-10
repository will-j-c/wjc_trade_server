const utils = require('../utils/utils');
const axios = require('axios');

const baseEndpoints = [
  'https://api.binance.com',
  'https://api1.binance.com',
  'https://api2.binance.com',
  'https://api3.binance.com',
  'https://api4.binance.com',
];

let quickestBaseEndpoint = baseEndpoints[0];

const api = {
  // Updates the base end point for binance based on the quickest ping response
  ping: async () => {
    const endpoint = '/api/v3/ping';
    const responseTimes = baseEndpoints.map(async (baseEndpoint, idx) => {
      // Add an interceptor to add request started at
      axios.interceptors.request.use((req) => {
        req.meta = req.meta || {};
        req.meta.requestStartedAt = new Date().getTime();
        return req;
      });
      // Add interceptor to record request duration in ms
      axios.interceptors.response.use(
        (res) => {
          res.durationInMs =
            new Date().getTime() - res.config.meta.requestStartedAt;
          return res;
        },
        (res) => {
          res.durationInMs =
            new Date().getTime() - res.config.meta.requestStartedAt;
          throw res;
        }
      );

      const response = await utils.get(`${baseEndpoint}${endpoint}`);
      return response?.durationInMs;
    });
    const resolved = await Promise.all(responseTimes);
    const min = resolved.reduce((accumulator, currentValue, index) => {
      return Math.min(accumulator, currentValue);
    }, Infinity);
    quickestBaseEndpoint = baseEndpoints[resolved.indexOf(min)];
  },
  getMarketSymbols: async () => {
    const endpoint = '/api/v3/exchangeInfo';
    const response = await utils.get(`${quickestBaseEndpoint}${endpoint}`);
    const symbols = response?.data?.symbols.map((symbol) => symbol?.symbol);
    return symbols;
  },
  getPriorDayHistoricKlines: async () => {
    const interval = [
      '1s',
      '1m',
      '3m',
      '5m',
      '15m',
      '30m',
      '1h',
      '2h',
      '4h',
      '6h',
      '8h',
      '12h',
      '1d',
      '3d',
      '1w',
      '1mo',
    ];
    const endpoint =
      'https://data.binance.vision/data/spot/daily/klines/ADABKRW/1h/ADABKRW-1h-2020-08.zip';
    const response = await utils.get(endpoint)
    console.log(response.data)
  },
};

module.exports = api;
