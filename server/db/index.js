const Sequelize = require('sequelize');

const models = require('./models');

// If you've got a DATABASE_URL set as environment variable, such as with a
// Heroku deployment, this should check for that first.
const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost:5432/boilermaker', {
  logging: false // consider setting this up for dev. NOTE that it has to ba a function, not just true
  // consider other options here, like native: true
});

module.exports = db;
