const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path')
// const {resolve} = require('path')

const app = express();

// Use morgan for logging
app.use(morgan('dev'));

// Body parsing middleware.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Mount the API routes
const api = require('./api');
app.use('/api', api);

// Static files come from the /public directory
app.use(express.static(path.join(__dirname, '../public')));

// This catch-all route sends all requests to the index.html
app.get('*', function (req, res, next) {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.use(function (err, req, res, next) {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

module.exports = app;
