const createHTTPError = require('http-errors');
const paths = require('../config/paths');
const { User } = require(`${paths.models}/index`);
const { createSession, refreshSession } = require('../services/authSession');
const UncorrectPassword = require('../errors/UncorrectPassword');

module.exports.signUp = async (req, res, next) => {
  try {
    const { body } = req;
    const user = await User.create(body);
    if (user) {
      const data = await createSession(user);
      return res.status(201).send({ data });
    }
    next(createHTTPError(400, 'Bad request'));
  } catch (error) {
    next(error);
  }
};
module.exports.signIn = async (req, res, next) => {
  try {
    const {
      body: { email, password },
    } = req;
    const user = await User.findOne({ where: { email } });
    if (user && (await user.comparePassword(password))) {
      const data = await createSession(user);
      return res.status(200).send({ data });
    }
    return next(new UncorrectPassword(`Wrong email or password`));
  } catch (error) {
    next(error);
  }
};
module.exports.refresh = async (req, res, next) => {
  try {
    const {
      body: { refreshToken },
    } = req;

    if (refreshToken) {
      const data = await refreshSession(refreshToken);
      return res.status(200).send({ data });
    }
    next(createHTTPError(400, 'Bad request'));
  } catch (error) {
    next(error);
  }
};
