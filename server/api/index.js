const router = require('express').Router();

router.get('/', (req, res, next) => {
  res.send(`Here's the API index`);
})

module.exports = router;
