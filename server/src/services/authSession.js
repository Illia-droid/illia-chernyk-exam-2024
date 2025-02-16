const { createTokenPair } = require('../services/jwtServices');

module.exports.createSession = async (user) => {
  try {
    const tokenPair = await createTokenPair(user);
    return { user, tokenPair };
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports.refreshSession = async (user) => {
  try {
    const tokenPair = await createTokenPair(user);
    return { tokenPair };
  } catch (error) {
    throw new Error(error.message);
  }
};
