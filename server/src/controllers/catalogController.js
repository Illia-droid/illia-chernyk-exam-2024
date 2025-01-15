const paths = require('../config/paths');
const db = require(`${paths.models}/index`);

module.exports.createCatalog = async (req, res, next) => {
  const { catalogName, chatId } = req.body;
  const userId = req.tokenData.userId;

  try {
    const catalog = await db.Catalog.create({
      userId,
      catalogName,
    });

    const conversation = await db.Conversation.findOne({
      where: { id: chatId },
    });

    await catalog.addChat(conversation);

    res.send(catalog);
  } catch (err) {
    next(err);
  }
};

module.exports.updateNameCatalog = async (req, res, next) => {
  try {
    const { catalogId, catalogName } = req.body;
    const userId = req.tokenData.userId;
    const [updatedRows, [updatedCatalog]] = await db.Catalog.update(
      { catalogName },
      {
        where: {
          id: catalogId,
          userId: userId,
        },
        returning: true,
      }
    );

    if (updatedRows === 0) {
      return res
        .status(404)
        .send({ message: 'Catalog not found or not updated' });
    }

    res.send(updatedCatalog);
  } catch (err) {
    next(err);
  }
};

module.exports.addNewChatToCatalog = async (req, res, next) => {
  try {
    const { catalogId, chatId } = req.body;
    const userId = req.tokenData.userId;

    const catalog = await db.Catalog.findOne({
      where: { id: catalogId, userId: userId },
    });

    if (!catalog) {
      return res.status(404).send({ message: 'Catalog not found' });
    }
    const conversation = await db.Conversation.findOne({
      where: { id: chatId },
    });

    await catalog.addChat(conversation);

    res.send(catalog);
  } catch (err) {
    next(err);
  }
};

module.exports.removeChatFromCatalog = async (req, res, next) => {
  try {
    const { catalogId, chatId } = req.body;
    const userId = req.tokenData.userId;

    const catalog = await db.Catalog.findOne({
      where: { id: catalogId, userId: userId },
      include: { model: db.Conversation, as: 'chats' },
    });

    if (!catalog) {
      return res.status(404).send({ message: 'Catalog not found' });
    }

    const conversation = await db.Conversation.findOne({
      where: { id: chatId },
    });

    if (!conversation) {
      return res.status(404).send({ message: 'Chat not found' });
    }

    await catalog.removeChat(conversation);

    const updatedCatalog = await db.Catalog.findOne({
      where: { id: catalogId, userId: userId },
      include: { model: db.Conversation, as: 'chats' },
    });

    const { id, catalogName, chats } = updatedCatalog;

    res.send({
      id,
      catalogName,
      userId,
      chats,
      chatId,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.deleteCatalog = async (req, res, next) => {
  try {
    await db.Catalog.destroy({
      where: {
        id: req.body.catalogId,
        userId: req.tokenData.userId,
      },
    });

    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

module.exports.getCatalogs = async (req, res, next) => {
  try {
    const catalogs = await db.Catalog.findAll({
      where: { userId: req.tokenData.userId },
      include: [
        {
          model: db.Conversation,
          as: 'chats',
        },
      ],
    });

    res.send(catalogs);
  } catch (err) {
    next(err);
  }
};
