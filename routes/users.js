const router = require('express').Router();
const fs = require('fs').promises;
const path = require('path');

router.get('/users', (req, res) => {
  fs.readFile(path.join(__dirname, '..', 'data', 'users.json'), {
    encoding: 'utf8',
  })
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      res.status(500).send(JSON.stringify({ message: err.message }));
    });
});

router.get('/users/:id', (req, res) => {
  fs.readFile(path.join(__dirname, '..', 'data', 'users.json'), {
    encoding: 'utf8',
  })
    .then((users) => {
      const user = JSON.parse(users).find((item) => item._id === req.params.id);
      if (!user) {
        res.status(404).send(JSON.stringify({ message: 'User ID not found' }));
        return;
      }
      res.send(JSON.stringify(user));
    })
    .catch((err) => {
      res.status(500).send(JSON.stringify({ message: err.message }));
    });
});

module.exports = router;
