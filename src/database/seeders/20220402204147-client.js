'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Client',
      [
        {
          company: 'Fanáticos por Whatsapp 2',
          cnpj: '87.437.710/0001-61',
          address: 'R. Dr. Alcides Vieira Arcoverde, 1225 - Jardim das Américas, Curitiba - PR, 81520-260',
        },
        {
          company: 'Inimigos do Whatsapp 2',
          cnpj: '07.170.965/0001-71',
          address: 'R. Imac. Conceição, 1155 - Prado Velho, Curitiba - PR, 80215-901',
        },
        {
          company: 'Whatsapp 3',
          cnpj: '13.347.016/0001-17',
          address: 'Menlo Park, California, United States',
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Client', null, {});
  },
};
