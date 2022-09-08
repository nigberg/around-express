const express = require('express');
const helmet = require('helmet');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const { NOT_FOUND_CODE } = require('./utils/constants');

const app = express();

app.use(helmet());
app.use('/', usersRouter);
app.use('/', cardsRouter);
app.use((req, res) => {
  res.status(NOT_FOUND_CODE).send({ message: `Route ${req.url} not found` });
});
const { PORT = 3000 } = process.env;

app.listen(PORT, () => {});
