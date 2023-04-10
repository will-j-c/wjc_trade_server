const utils = require('../utils/utils');
const axios = require('axios');
const fs = require('fs');
const path = require('node:path');

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
      'https://data.binance.vision/data/spot/daily/klines/1INCHBTC/1h/1INCHBTC-1h-2023-04-07.zip';
    // Call the binance historic data API and retrieve the zip file
    const response = await utils.getFile(endpoint);
    // Create the path name so saves in the temp downloads folder
    const pathName = path.join(__dirname, '..', 'download', 'temp.zip');
    // Use the fs module to download and save the temp zip file to server memory
    const writer = fs.createWriteStream(pathName);
    response.data.pipe(writer);
    // Handle unpacking the zip file
    // Handle writing the csv to the DB
    // Handle closing the files and deleting temp files

  },
};

module.exports = api;
