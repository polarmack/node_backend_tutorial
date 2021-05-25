require('./config_env');
require('express-async-errors');

const express = require('express');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const { connectDB } = require('./db/connect');
const cookieParser = require('cookie-parser');
const errorHandler = require('./shared/middlewares/error_handler');
const schemaInjection = require('./shared/middlewares/schema_injection');
const echoRouter = require('./node_app/controllers/echo');
const noAuthTodoRouter = require('./node_app/controllers/noauth_todo');
const authTodoRouter = require('./node_app/controllers/auth_todo');
const authRouter = require('./node_app/controllers/auth');

// Initialize express
const app = express();

// Connect to database
connectDB();

// Use Middleware stack
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet({ dnsPrefetchControl: false }));
app.use(schemaInjection);
app.use(cors({ origin: true }));

if (process.env.ENV === 'dev') {
  app.use(morgan('dev'));
}

app.get('/health', (req, res) => {
  res.send('Server OK!');
});

// Use router
app.use('/app/echo', echoRouter);
app.use('/app/no_auth/todos', noAuthTodoRouter);
app.use('/app/with_auth/todos', authTodoRouter);
app.use('/app/auth', authRouter);

// error handler
app.use((req, res, next) => res.status(404).json({ error: 'page not found' }));
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.ENV} mode on port ${PORT}`);
});
