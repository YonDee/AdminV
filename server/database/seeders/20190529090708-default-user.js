'use strict';
const bcrypt = require('../../plugins/bcrypt')


module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    const now = new Date()
    const password = await bcrypt.enbcrypt('123123');
    return queryInterface.bulkInsert('Users', [{
      name: 'AdminV',
      email: 'admin@v.com',
      account: 'adminv',
      password: password,
      createdAt: now,
      updatedAt: now
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   return queryInterface.bulkDelete('Users', null, {});
  }
};
