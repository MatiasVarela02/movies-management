const bcrypt = require('bcrypt');
module.exports = {
  up: async (queryInterface, _) => {
    const hashedPassword = await bcrypt.hash('admin', 10);

    await queryInterface.bulkInsert('Users', [{
      user_name: 'admin',
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
      role: 'admin'
    }], { returning: true });

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', {
      user_name: 'admin'
    }, {});
  }
};
