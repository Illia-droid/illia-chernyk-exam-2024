const { Op } = require('sequelize');
const db = require('../models');
const userQueries = require('./queries/userQueries');
const controller = require('../socketInit');

module.exports.addMessage = async (req, res, next) => {
  const participants = req.body.chatData.participants;

  const interlocutorId = req.body.interlocutorId;
  try {
    let conversation = await db.Conversation.findOne({
      where: { participants: participants },
    });

    if (!conversation) {
      conversation = await db.Conversation.create({
        participants,
      });
    }

    const message = await db.Message.create({
      sender: req.tokenData.userId,
      body: req.body.messageBody,
      conversation: conversation.id,
    });

    controller.getChatController().emitNewMessage(interlocutorId, {
      message,
    });
    res.send({
      message,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.getChat = async (req, res, next) => {
  const participants = [req.tokenData.userId, req.body.interlocutorId];
  participants.sort((a, b) => a - b);
  try {
    const messages = await db.Message.findAll({
      order: [['createdAt', 'asc']],
      include: [
        {
          model: db.Conversation,
          required: true,
          where: {
            participants: {
              [Op.contains]: participants,
            },
          },
          attributes: ['id', 'participants'],
        },
      ],
    });
    const interlocutor = await userQueries.findUser({
      id: req.body.interlocutorId,
    });
    res.send({
      messages,
      interlocutor: {
        firstName: interlocutor.firstName,
        lastName: interlocutor.lastName,
        displayName: interlocutor.displayName,
        id: interlocutor.id,
        avatar: interlocutor.avatar,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports.getPreview = async (req, res, next) => {
  try {
    const conversations = await db.Conversation.findAll({
      where: {
        participants: {
          [Op.contains]: [req.tokenData.userId],
        },
      },
      include: [
        {
          model: db.Message,
          attributes: ['id', 'body', 'createdAt'],
          limit: 1,
          order: [['createdAt', 'DESC']],
        },
      ],
    });

    const interlocutor = [];
    conversations.forEach((conversation) => {
      const secondParticipantId = conversation.participants.find(
        (participant) => participant !== req.tokenData.userId
      );

      if (secondParticipantId) {
        interlocutor.push(secondParticipantId);
      }
    });

    const users = await db.User.findAll({
      where: {
        id: interlocutor,
      },
    });

    const chatPeviews = conversations.map((conversation) => {
      const conversationJson = conversation.toJSON();

      users.forEach((user) => {
        if (conversationJson.participants.includes(user.dataValues.id)) {
          conversationJson.interlocutor = {
            id: user.dataValues.id,
            firstName: user.dataValues.firstName,
            lastName: user.dataValues.lastName,
            displayName: user.dataValues.displayName,
            avatar: user.dataValues.avatar,
          };
        }
      });

      return conversationJson;
    });

    res.send(chatPeviews);
  } catch (err) {
    next(err);
  }
};

module.exports.blackList = async (req, res, next) => {
  const userId = req.tokenData.userId;
  const participants = req.body.participants;
  const blackListFlag = req.body.blackListFlag;

  try {
    const index = participants.indexOf(userId);

    const chat = await db.Conversation.findOne({
      where: {
        participants: participants,
      },
    });

    const updatedBlackList = [...chat.blackList];
    updatedBlackList[index] = blackListFlag;
    chat.blackList = updatedBlackList;
    await chat.save();

    res.send(chat);

    const interlocutorId = participants.filter(
      (participant) => participant !== userId
    )[0];

    controller.getChatController().emitChangeBlockStatus(interlocutorId, chat);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports.favoriteChat = async (req, res, next) => {
  const userId = req.tokenData.userId;
  const participants = req.body.participants;
  const favoriteFlag = req.body.favoriteFlag;

  try {
    const index = participants.indexOf(userId);
    const chat = await db.Conversation.findOne({
      where: {
        participants: participants,
      },
    });
    const updatedFavoriteList = [...chat.favoriteList];
    updatedFavoriteList[index] = favoriteFlag;
    chat.favoriteList = updatedFavoriteList;
    await chat.save();
    res.send(chat);
  } catch (err) {
    res.send(err);
  }
};


