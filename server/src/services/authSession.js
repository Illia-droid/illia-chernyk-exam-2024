const { createTokenPair } = require('../services/jwtServices');

module.exports.createSession = async (user, options = {}) => {
  try {
    const tokenPair = await createTokenPair(user);
    if (await user.countRefreshTokens()) {
      const [token] = await user.getRefreshTokens();
      await token.update({ ...options, value: tokenPair.refresh });
    } else {
      await user.createRefreshToken({ ...options, value: tokenPair.refresh });
    }
    user.password = undefined;
    return { user, tokenPair };
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports.refreshSession = async (refreshToken) => {
  try {
    const user = await refreshToken.getUser();
    const tokenPair = await createTokenPair(user);
    await refreshToken.update({ value: tokenPair.refresh });
    user.password = undefined;
    return { user, tokenPair };
  } catch (error) {
    throw new Error(error.message);
  }
};
