const express = require('express');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const app = express();

app.use('/', usersRouter);
app.use('/', cardsRouter);
const { PORT = 3000 } = process.env;

app.listen(PORT, () => {
  app.get('*', (req, res) => {
    res
      .status(404)
      .send(JSON.stringify({ message: 'Requested resource not found' }));
  });
});
