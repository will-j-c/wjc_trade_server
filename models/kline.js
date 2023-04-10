const { DataTypes } = require('sequelize');
const connection = require('../database/connection');

const Kline = connection.define(
  'Kline',
  {
    // Model attributes are defined here
    symbol: { type: DataTypes.CHAR, allowNull: false },
    interval: { type: DataTypes.CHAR, allowNull: false },
    openTime: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    open: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    high: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    low: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    close: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    volume: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    closeTime: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    quoteAssetVolume: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    numOfTrades: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    takerBuyBaseAssetVolume: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    takerBuyQuoteAssetVolume: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
  },
  {
    // Other model options go here
  }
);

module.exports = Kline;
