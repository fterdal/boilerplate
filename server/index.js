const app = require('./app');
const db = require('./db');

// Sync the database
const force = true;
const PORT = process.env.PORT || 1706;
db.sync({force})
  .then( () => {

    // Start the server!
    app.listen(PORT, () => {
      console.log(`Listening on Port ${PORT}!`);
    })
  })
