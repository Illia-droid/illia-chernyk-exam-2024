const logError = require('../errorsLogger');

module.exports.loggerMiddleware = async (err, req, res, next) => {
  try {
    await logError(err.message, err.status, err.stack);
  } catch (loggingError) {
    console.error('Error logging failed:', loggingError);
  }
  next(err);
};
