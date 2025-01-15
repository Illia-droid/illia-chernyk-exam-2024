const authRouter = require('express').Router();
const authController = require('../controllers/authController');
const { checkRefreshToken } = require('../middlewares/checkToken');
const validators = require('../middlewares/validators');

authRouter.post(
  '/sign-up',
  validators.validateRegistrationData,
  authController.signUp
);
authRouter.post('/sign-in', validators.validateLogin, authController.signIn);
authRouter.post('/refresh', checkRefreshToken, authController.refresh);

module.exports = authRouter;
