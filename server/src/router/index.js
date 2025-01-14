const express = require('express');
const basicMiddlewares = require('../middlewares/basicMiddlewares');
const hashPass = require('../middlewares/hashPassMiddle');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const paymentController = require('../controllers/paymentController');
const contestController = require('../controllers/contestController');
const offerController = require('../controllers/offerController');
const chatController = require('../controllers/chatController');
const catalogController = require('../controllers/catalogController');
const checkToken = require('../middlewares/checkToken');
const validators = require('../middlewares/validators');
const upload = require('../utils/fileUpload');

const router = express.Router();

router.post(
  '/registration',
  validators.validateRegistrationData,
  hashPass,
  authController.registration
);
router.post('/login', validators.validateLogin, authController.login);
router.post(
  '/dataForContest',
  checkToken.checkToken,
  contestController.dataForContest
);
router.post(
  '/pay',
  checkToken.checkToken,
  basicMiddlewares.onlyForCustomer,
  upload.uploadContestFiles,
  basicMiddlewares.parseBody,
  validators.validateContestCreation,
  paymentController.payment
);
router.post(
  '/getCustomersContests',
  checkToken.checkToken,
  contestController.getCustomersContests
);
router.post(
  '/getAllContests',
  checkToken.checkToken,
  basicMiddlewares.onlyForCreative,
  contestController.getContests
);
router.post(
  '/downloadFile/:fileName',
  checkToken.checkToken,
  contestController.downloadFile
);
router.post(
  '/setNewOffer',
  checkToken.checkToken,
  upload.uploadLogoFiles,
  basicMiddlewares.canSendOffer,
  offerController.setNewOffer
);
router.post(
  '/setOfferStatus',
  checkToken.checkToken,
  basicMiddlewares.onlyForCustomerWhoCreateContest,
  offerController.setOfferStatus
);
router.post(
  '/cashout',
  checkToken.checkToken,
  basicMiddlewares.onlyForCreative,
  paymentController.cashout
);
router.post('/newMessage', checkToken.checkToken, chatController.addMessage);
router.post(
  '/createCatalog',
  checkToken.checkToken,
  catalogController.createCatalog
);
router.post(
  '/addNewChatToCatalog',
  checkToken.checkToken,
  catalogController.addNewChatToCatalog
);
router.post(
  '/removeChatFromCatalog',
  checkToken.checkToken,
  catalogController.removeChatFromCatalog
);
router.post(
  '/deleteCatalog',
  checkToken.checkToken,
  catalogController.deleteCatalog
);
router.post('/getCatalogs', checkToken.checkToken, catalogController.getCatalogs);
router.post('/sendEmail', offerController.sendEmailController);
router.post('/getChat', checkToken.checkToken, chatController.getChat);


router.get(
  '/getContestById',
  checkToken.checkToken,
  basicMiddlewares.canGetContest,
  contestController.getContestById
);
router.get('/getUser', checkToken.checkAuth);
router.get('/getAllOffers', offerController.getAllOffers);
router.get('/getPreview', checkToken.checkToken, chatController.getPreview);

router.patch(
  '/updateContest',
  checkToken.checkToken,
  upload.updateContestFile,
  contestController.updateContest
);
router.patch(
  '/changeMark',
  checkToken.checkToken,
  basicMiddlewares.onlyForCustomer,
  userController.changeMark
);
router.patch(
  '/updateUser',
  checkToken.checkToken,
  upload.uploadAvatar,
  userController.updateUser
);
router.patch('/blackList', checkToken.checkToken, chatController.blackList);
router.patch('/favorite', checkToken.checkToken, chatController.favoriteChat);
router.patch(
  '/updateNameCatalog',
  checkToken.checkToken,
  catalogController.updateNameCatalog
);
router.patch(
  '/setModerationOfferStatus',
  offerController.setModerationOfferStatus
);

module.exports = router;
