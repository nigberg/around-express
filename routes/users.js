const router = require('express').Router();
const fs = require('fs');
const path = require('path');

let users = '';
fs.readFile(
  path.join(__dirname, '../data/users.json'),
  { encoding: 'utf8' },
  (err, data) => {
    users = JSON.parse(data);
  },
);

router.get('/users', (req, res) => {
  res.send(JSON.stringify(users));
});
router.get('/users/:id', (req, res) => {
  const user = users.find((item) => item._id === req.params.id);
  if (!user) {
    res.status(404).send(JSON.stringify({ message: 'User ID not found' }));
    return;
  }
  res.send(JSON.stringify(user));
});
module.exports = router;
