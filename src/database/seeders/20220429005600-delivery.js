'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Delivery',
      [
        {
          description: 'Fandangos de Whatsapp',
          motoboy: 'Henrique Sampaio',
          client: 'Fanáticos por Whatsapp 2',
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Delivery', null, {});
  }
};
