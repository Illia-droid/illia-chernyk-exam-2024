module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Users',
      [
        {
          id: 0,
          firstName: 'moderator',
          lastName: 'moderator',
          displayName: 'moderator',
          passwordHash:
            '$2b$05$96j9arWc2IhUXAuAcn4tjOIZCy8UTyEX/T/NZEc7jOFAjs89oBTdO', // moderator@gmail.com
          email: 'moderator@gmail.com',
          accessToken: 'moderator',
          role: 'moderator',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ],
      {}
    );
  },
};
