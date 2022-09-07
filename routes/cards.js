const router = require('express').Router();
const fs = require('fs').promises;
const path = require('path');

router.get('/cards', (req, res) => {
  fs.readFile(
    path.join(__dirname, '..', 'data', 'cards.json'),
    { encoding: 'utf8' },
  )
    .then((cards) => {
      res.send(cards);
    })
    .catch((err) => {
      res.status(500).send(JSON.stringify({ message: err.message }));
    });
});

module.exports = router;
