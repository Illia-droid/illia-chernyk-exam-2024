const express = require('express');
const basicMiddlewares = require('../middlewares/basicMiddlewares');
const userController = require('../controllers/userController');
const paymentController = require('../controllers/paymentController');
const contestController = require('../controllers/contestController');
const offerController = require('../controllers/offerController');
const chatController = require('../controllers/chatController');
const catalogController = require('../controllers/catalogController');
const checkToken = require('../middlewares/checkToken');
const validators = require('../middlewares/validators');
const upload = require('../utils/fileUpload');
const authRouter = require('./authRouter');
const router = express.Router();

router.use('/auth', authRouter);
router.get('/getUser', checkToken.checkAuth);
router.use(checkToken.checkAccessToken);

router.post('/dataForContest', contestController.dataForContest);
router.post(
  '/pay',
  basicMiddlewares.onlyForCustomer,
  upload.uploadContestFiles,
  basicMiddlewares.parseBody,
  validators.validateContestCreation,
  paymentController.payment
);
router.post('/getCustomersContests', contestController.getCustomersContests);
router.post(
  '/getAllContests',
  basicMiddlewares.onlyForCreative,
  contestController.getContests
);
router.post('/downloadFile/:fileName', contestController.downloadFile);
router.post(
  '/setNewOffer',
  upload.uploadLogoFiles,
  basicMiddlewares.canSendOffer,
  offerController.setNewOffer
);
router.post(
  '/setOfferStatus',
  basicMiddlewares.onlyForCustomerWhoCreateContest,
  offerController.setOfferStatus
);
router.post(
  '/cashout',
  basicMiddlewares.onlyForCreative,
  paymentController.cashout
);
router.post('/newMessage', chatController.addMessage);
router.post('/createCatalog', catalogController.createCatalog);
router.post('/addNewChatToCatalog', catalogController.addNewChatToCatalog);
router.post('/removeChatFromCatalog', catalogController.removeChatFromCatalog);
router.post('/deleteCatalog', catalogController.deleteCatalog);
router.post('/getCatalogs', catalogController.getCatalogs);
router.post('/sendEmail', offerController.sendEmailController);
router.post('/getChat', chatController.getChat);

router.get(
  '/getContestById',
  basicMiddlewares.canGetContest,
  contestController.getContestById
);

router.get('/getAllOffers', offerController.getAllOffers);
router.get('/getPreview', chatController.getPreview);

router.patch(
  '/updateContest',
  upload.updateContestFile,
  contestController.updateContest
);
router.patch(
  '/changeMark',
  basicMiddlewares.onlyForCustomer,
  userController.changeMark
);
router.patch('/updateUser', upload.uploadAvatar, userController.updateUser);
router.patch('/blackList', chatController.blackList);
router.patch('/favorite', chatController.favoriteChat);
router.patch('/updateNameCatalog', catalogController.updateNameCatalog);
router.patch(
  '/setModerationOfferStatus',
  offerController.setModerationOfferStatus
);

module.exports = router;
