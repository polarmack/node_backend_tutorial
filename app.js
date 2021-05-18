require('./config_env');

const express = require('express');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const echoRouter = require('./controller/echo');

const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

if (process.env.ENV === 'dev') {
  app.use(morgan('dev'));
}

app.get('/health', (req, res) => {
  res.send('Server OK!');
});

app.use('/echo', echoRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.ENV} mode on port ${PORT}`);
});
