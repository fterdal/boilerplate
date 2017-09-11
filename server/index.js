const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path')
const {resolve} = require('path')

const app = express();

// Use morgan for logging
app.use(morgan('dev'));

// Body parsing middleware.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Static files come from the /public directory
app.use(express.static(path.resolve(__dirname, '..', 'public')))

// This catch-all route sends all requests to the index.html
app.get('*', function (req, res, next) {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Try something like this to fix static routing bugs for bundle.js
// (in which any routes with more than one slash look for bundle.js in the wrong place)
// It might not be a problem, depending on how react-router handles long urls
// app.get('/*', (_, res) => res.sendFile(resolve(__dirname, '..', 'public', 'index.html')))


// Start the server!
const PORT = 1706;
app.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}!`);
})
