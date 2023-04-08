const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  'crypto',
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: 'localhost',
    dialect: 'postgres',
  }
);

module.exports = sequelize;