module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Banks',
      [
        {
          cardNumber: '4564654564564564',
          name: 'SquadHelp',
          expiry: '11/22',
          cvc: '453',
          balance: 0,
          createdAt: new Date().toISOString(), 
          updatedAt: new Date().toISOString(), 
        },
        {
          cardNumber: '4111111111111111',
          name: 'yriy',
          expiry: '09/25',
          cvc: '505',
          balance: 5000,
          createdAt: new Date().toISOString(), 
          updatedAt: new Date().toISOString(),
        },
      ],
      {}
    );
  },
};
