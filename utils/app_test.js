require('../config_env');
require('express-async-errors');

const express = require('express');
const bodyParser = require('body-parser');
const errorHandler = require('../middlewares/error_handler');
const { connectDB, disconnectDB } = require('./db');

module.exports = (controller) =>
  express()
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    .use(controller)
    .use(errorHandler);

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => await disconnectDB());
