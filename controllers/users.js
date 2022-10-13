const {
  OK_CODE, OK_CREATED_CODE, INVALID_DATA_CODE, NOT_FOUND_CODE, SERVER_ERROR_CODE,
} = require('../utils/constants');
const User = require('../models/user');

const getAllUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.status(OK_CODE).send({ data: users });
    })
    .catch(() => {
      res.status(SERVER_ERROR_CODE).send({ message: 'An error has occured on server' });
    });
};

const getUser = (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .orFail(() => {
      const err = new Error('User not found');
      err.status = NOT_FOUND_CODE;
      throw err;
    })
    .then((user) => {
      res.status(OK_CODE).send({ data: user });
    })
    .catch((err) => {
      if (err.status === NOT_FOUND_CODE) {
        res.status(NOT_FOUND_CODE).send({ message: err.message });
      } else if (err.name === 'CastError') {
        res.status(INVALID_DATA_CODE).send({ message: 'Incorrect data format' });
      } else {
        res.status(SERVER_ERROR_CODE).send({ message: 'An error has occured on server' });
      }
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.status(OK_CREATED_CODE).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const errorsMessage = `${Object.values(err.errors).map((error) => error.message).join(', ')}`;
        res.status(INVALID_DATA_CODE).send({ message: errorsMessage });
      } else {
        res.status(SERVER_ERROR_CODE).send({ message: 'An error has occured on server' });
      }
    });
};

const updateProfile = (req, res) => {
  const userId = req.user._id;
  const { name, about } = req.body;
  User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      res.status(OK_CREATED_CODE).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const errorsMessage = `${Object.values(err.errors).map((error) => error.message).join(', ')}`;
        res.status(INVALID_DATA_CODE).send({ message: errorsMessage });
      } else if (err.name === 'CastError') {
        res.status(INVALID_DATA_CODE).send({ message: 'Incorrect data format' });
      } else {
        res.status(SERVER_ERROR_CODE).send({ message: 'An error has occured on server' });
      }
    });
};

const updateAvatar = (req, res) => {
  const userId = req.user._id;
  const { avatar } = req.body;
  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      res.status(OK_CREATED_CODE).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const errorsMessage = `${Object.values(err.errors).map((error) => error.message).join(', ')}`;
        res.status(INVALID_DATA_CODE).send({ message: errorsMessage });
      } else if (err.name === 'CastError') {
        res.status(INVALID_DATA_CODE).send({ message: 'Incorrect data format' });
      } else {
        res.status(SERVER_ERROR_CODE).send({ message: 'An error has occured on server' });
      }
    });
};

module.exports = {
  getAllUsers, getUser, createUser, updateProfile, updateAvatar,
};
