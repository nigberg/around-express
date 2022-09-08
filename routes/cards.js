const router = require('express').Router();
const fs = require('fs').promises;
const path = require('path');
const { SERVER_ERROR_CODE } = require('../utils/constants');

router.get('/cards', (req, res) => {
  fs.readFile(
    path.join(__dirname, '..', 'data', 'cards.json'),
    { encoding: 'utf8' },
  )
    .then((cards) => {
      // 'cards' contains JSON string read from file
      // sending JSON to client
      res.send(cards);
    })
    .catch((err) => {
      res.status(SERVER_ERROR_CODE).send(JSON.stringify({ message: `Server error: ${err.message}` }));
    });
});

module.exports = router;
