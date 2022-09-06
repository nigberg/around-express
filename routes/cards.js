const router = require('express').Router();
const fs = require('fs');
const path = require('path');

let cards = '';
fs.readFile(
  path.join(__dirname, '../data/cards.json'),
  { encoding: 'utf8' },
  (err, data) => {
    cards = data;
  },
);

router.get('/cards', (req, res) => {
  res.send(cards);
});

module.exports = router;
