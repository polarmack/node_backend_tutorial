require('./config_env');
require('express-async-errors');

const express = require('express');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const { connectDB, disconnectDB } = require('./utils/db');
const errorHandler = require('./middlewares/error_handler');
const echoRouter = require('./controllers/echo');
const todoRouter = require('./controllers/todo');

// Initialize express
const app = express();

// Connect to database
connectDB();

// Use Middleware stack
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

if (process.env.ENV === 'dev') {
  app.use(morgan('dev'));
}

app.get('/health', (req, res) => {
  res.send('Server OK!');
});

// Use router
app.use('/echo', echoRouter);
app.use('/todos', todoRouter);

// error handler
app.use((req, res, next) => res.status(404).json({ error: 'page not found' }));
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.ENV} mode on port ${PORT}`);
});
