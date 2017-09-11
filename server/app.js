const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const passport = require('passport');

const app = express();

// Use morgan for logging
app.use(morgan('dev'));


// Body parsing middleware.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Session middleware
// NOTE that you can set up a secret as an environment variable (you should)
// Also NOTE that we could have set up a table to store sessions in a persistent
// fashion. This is a good idea for production apps. It would look something like this:
/*
// we will need our sequelize instance from somewhere
const db = require('./db');
// we should do this in the same place we've set up express-session
const session = require('express-session');

// configure and create our database store
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const dbStore = new SequelizeStore({ db: db });

// sync so that our session table gets created
dbStore.sync();

// plug the store into our session middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'a wildly insecure secret',
  store: dbStore,
  resave: false,
  saveUninitialized: false
}));
*/
const secret = process.env.SESSION_SECRET || 'N6Xp6TJ65QYZ3fzQnvvRVf27Y5XpjrgY';
app.use(session({
  secret,
  resave: false,
  saveUninitialized: false
}));

// After our sessions are configured, connect to passport for authentication
app.use(passport.initialize());
app.use(passport.session());

module.exports = app;

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
