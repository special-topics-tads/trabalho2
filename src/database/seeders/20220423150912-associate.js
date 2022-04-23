'use strict';
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(12);

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Associate',
      [
        {
          company: 'Barraquinha do Joaquim',
          cnpj: '87.437.710/0001-81',
          address: 'R. Benedito da Silva, 555 - Jardim da Saudade, Curitiba - PR, 81300-260',
          password: bcrypt.hashSync('123', salt),
        },
        {
          company: 'Bolachas da Vó Lurdes',
          cnpj: '07.170.965/0001-01',
          address: 'R. da Bolachada, 15 - Uberaba, Curitiba - PR, 80123-565',
          password: bcrypt.hashSync('456', salt),
        },
        {
          company: 'Espetinho de arroz lanches',
          cnpj: '13.347.016/0002-17',
          address: 'Av. Senador Salgado Filho - Curitiba - PR, 88776-130',
          password: bcrypt.hashSync('789', salt),
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Associate', null, {});
  }
};
