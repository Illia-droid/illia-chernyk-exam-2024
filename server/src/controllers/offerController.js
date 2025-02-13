const paths = require('../config/paths');
const db = require(`${paths.models}/index`);
const ServerError = require('../errors/ServerError');
const contestQueries = require('./queries/contestQueries');
const userQueries = require('./queries/userQueries');
const controller = require('../socketInit');
const CONSTANTS = require('../constants');
const { sendEmail } = require('../utils/sendEmail');

module.exports.setNewOffer = async (req, res, next) => {
  const obj = {};
  if (req.body.contestType === CONSTANTS.CONTEST_TYPES.LOGO) {
    obj.fileName = req.file.filename;
    obj.originalFileName = req.file.originalname;
  } else {
    obj.text = req.body.offerData;
  }
  obj.userId = req.tokenData.userId;
  obj.contestId = req.body.contestId;
  try {
    const result = await contestQueries.createOffer(obj);
    delete result.contestId;
    delete result.userId;
    controller
      .getNotificationController()
      .emitEntryCreated(req.body.customerId);
    const User = Object.assign({}, req.tokenData, { id: req.tokenData.userId });
    res.send(Object.assign({}, result, { User }));
  } catch (e) {
    return next(new ServerError());
  }
};

const rejectOffer = async (offerId, creatorId, contestId) => {
  const rejectedOffer = await contestQueries.updateOffer(
    { status: CONSTANTS.OFFER_STATUS_REJECTED },
    { id: offerId }
  );
  controller
    .getNotificationController()
    .emitChangeOfferStatus(
      creatorId,
      'Someone of yours offers was rejected',
      contestId
    );
  return rejectedOffer;
};

const resolveOffer = async (
  contestId,
  creatorId,
  orderId,
  offerId,
  priority,
  transaction
) => {
  const finishedContest = await contestQueries.updateContestStatus(
    {
      status: db.sequelize.literal(`   CASE
              WHEN "id"=${contestId}  AND "orderId"='${orderId}' THEN '${
        CONSTANTS.CONTEST_STATUSES.FINISHED
      }'
              WHEN "orderId"='${orderId}' AND "priority"=${
        priority + 1
      }  THEN '${CONSTANTS.CONTEST_STATUSES.ACTIVE}'
              ELSE '${CONSTANTS.CONTEST_STATUSES.PENDING}'
              END
      `),
    },
    { orderId },
    transaction
  );
  await userQueries.updateUser(
    { balance: db.sequelize.literal('balance + ' + finishedContest.prize) },
    creatorId,
    transaction
  );
  const updatedOffers = await contestQueries.updateOfferStatus(
    {
      status: db.sequelize.literal(` CASE
              WHEN "id"=${offerId} THEN '${CONSTANTS.OFFER_STATUS_WON}'
              ELSE '${CONSTANTS.OFFER_STATUS_REJECTED}'
              END
      `),
    },
    {
      contestId,
    },
    transaction
  );
  transaction.commit();
  const arrayRoomsId = [];
  updatedOffers.forEach((offer) => {
    if (
      offer.status === CONSTANTS.OFFER_STATUS_REJECTED &&
      creatorId !== offer.userId
    ) {
      arrayRoomsId.push(offer.userId);
    }
  });
  controller
    .getNotificationController()
    .emitChangeOfferStatus(
      arrayRoomsId,
      'Someone of yours offers was rejected',
      contestId
    );
  controller
    .getNotificationController()
    .emitChangeOfferStatus(creatorId, 'Someone of your offers WIN', contestId);
  return updatedOffers.find((offer) => offer.id === offerId).dataValues;
};

module.exports.setOfferStatus = async (req, res, next) => {
  let transaction;
  if (req.body.command === 'reject') {
    try {
      const offer = await rejectOffer(
        req.body.offerId,
        req.body.creatorId,
        req.body.contestId
      );
      res.send(offer);
    } catch (err) {
      next(err);
    }
  } else if (req.body.command === 'resolve') {
    try {
      transaction = await db.sequelize.transaction();
      const winningOffer = await resolveOffer(
        req.body.contestId,
        req.body.creatorId,
        req.body.orderId,
        req.body.offerId,
        req.body.priority,
        transaction
      );
      res.send(winningOffer);
    } catch (err) {
      transaction.rollback();
      next(err);
    }
  }
};

module.exports.getAllOffers = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const offset = (page - 1) * limit;

    const offersData = await db.Offer.findAndCountAll({
      where: { status: 'moderation' },
      limit: parseInt(limit, 10),
      offset: parseInt(offset, 10),
      include: [
        {
          model: db.User,
          required: true,
          attributes: {
            exclude: ['password', 'role', 'balance', 'accessToken'],
          },
        },
        {
          model: db.Contest,
          required: true,
          include: [
            {
              model: db.User,
              required: true,
              attributes: ['id', 'firstName', 'lastName', 'email', 'avatar'],
            },
          ],
        },
      ],
    });

    const totalPages = Math.ceil(offersData.count / limit);

    res.status(200).json({
      offers: offersData.rows,
      totalPages,
      currentPage: parseInt(page, 10),
    });
  } catch (error) {
    res.status(500).json({ error: 'Error processing the offer status' });
  }
};

module.exports.setModerationOfferStatus = async (req, res) => {
  const { id, status } = req.body;

  try {
    if (status === 'successful') {
      const offer = await db.Offer.findOne({ where: { id } });
      offer.status = 'pending';
      await offer.save();
      return res.status(200).json(offer);
    }

    if (status === 'decline') {
      const offer = await db.Offer.findOne({ where: { id } });
      offer.status = 'decline';
      await offer.destroy();
      return res.status(200).json(offer);
    }
    return res.status(400).json({ error: 'Invalid status' });
  } catch (error) {
    res.status(500).json({ error: 'Error processing the offer status' });
  }
};

module.exports.sendEmailController = async (req, res) => {
  try {
    await sendEmail(req.body);
    res.status(200).send('Email sent');
  } catch (error) {
    res.status(500).send('Failed to send email');
  }
};
