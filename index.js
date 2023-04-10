require('dotenv').config();
const express = require('express');
const connection = require('./database/connection');

const app = express();
const port = process.env.PORT;

// Try connecting to the database
try {
  connection.authenticate().then((response) => {
    console.log('Connection has been established successfully.');
  });
} catch (error) {
  console.error('Unable to connect to the database:', error);
  process.exit(1);
}
// Set the app listener
app.listen(port, () => {
  console.log(`wjc_trade_server listening on ${port}`);
});
