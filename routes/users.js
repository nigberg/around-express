const router = require('express').Router();
const fs = require('fs').promises;
const path = require('path');
const { NOT_FOUND_CODE, SERVER_ERROR_CODE } = require('../utils/constants');

router.get('/users', (req, res) => {
  fs.readFile(path.join(__dirname, '..', 'data', 'users.json'), {
    encoding: 'utf8',
  })
    .then((users) => {
      // 'users' contains JSON string read from file
      // sending JSON to client
      res.send({ data: JSON.parse(users) });
    })
    .catch((err) => {
      res.status(SERVER_ERROR_CODE).send({ message: `Server error: ${err.message}` });
    });
});

router.get('/users/:id', (req, res) => {
  fs.readFile(path.join(__dirname, '..', 'data', 'users.json'), {
    encoding: 'utf8',
  })
    .then((users) => {
      // 'users' contains JSON string read from file
      // converting JSON into JS Array to search in it
      const user = JSON.parse(users).find((item) => item._id === req.params.id);
      if (!user) {
        res.status(NOT_FOUND_CODE).send({ message: 'User ID not found' });
        return;
      }
      res.send({ data: JSON.parse(user) });
    })
    .catch((err) => {
      res.status(SERVER_ERROR_CODE).send(JSON.stringify({ message: `Server error: ${err.message}` }));
    });
});

module.exports = router;
