module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'RefreshTokens',
      [
        {
          id: 0,
          userId: 0,
          value: 'random_refresh_token_example_123456789',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ],
      {}
    );
  },
};
