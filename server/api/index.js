/* eslint new-cap:0 */
const router = require('express').Router();

// When we have API routes, add them to the API like this:
// router.use('/users', require('./users')); // matches all requests to /api/users/
// router.use('/puppies', require('./puppies')); // matches all requests to  /api/puppies/
// router.use('/kittens', require('./kittens')); // matches all requests to  /api/kittens/

router.get('/', (req, res, next) => {
  res.status(400).send(`Nothing to see here...`);
})

// I'm not sure I like this 404 error handling.
// Maybe the error should just be sent to the client.
router.use(function (req, res, next) {
  const err = new Error('Not found.');
  err.status = 404;
  next(err);
});

module.exports = router;
