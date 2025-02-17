const createHTTPError = require('http-errors');
const TokenError = require('../errors/TokenError');
const userQueries = require('../controllers/queries/userQueries');
const {
  verifyAccessToken,
  verifyRefreshToken,
} = require('../services/jwtServices');

module.exports.checkAuth = async (req, res, next) => {
  try {
    const {
      headers: { authorization },
    } = req;
    if (authorization) {
      const [, accessToken] = authorization.split(' ');
      const tokenData = await verifyAccessToken(accessToken);
      const user = await userQueries.findUser({ id: tokenData.userId });
      user.password = undefined;
      return res.status(200).send({ data: user });
    }
    next(createHTTPError(401, 'Need token'));
  } catch (err) {
    next(new TokenError('check auth error'));
  }
};

module.exports.checkAccessToken = async (req, res, next) => {
  try {
    const {
      headers: { authorization },
    } = req;
    if (authorization) {
      const [, accessToken] = authorization.split(' ');
      req.tokenData = await verifyAccessToken(accessToken);
      return next();
    }
    return next(createHTTPError(401, 'Need token'));
  } catch (err) {
    next(new TokenError('access token error'));
  }
};

module.exports.checkRefreshToken = async (req, res, next) => {
  try {
    const {
      body: { refreshToken },
    } = req;
    req.tokenData = await verifyRefreshToken(refreshToken);
    return next();
  } catch (err) {
    next(new TokenError('refresh token error'));
  }
};
