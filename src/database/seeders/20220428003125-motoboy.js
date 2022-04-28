'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Motoboy',
      [
        {
          nome: 'Carlos José da Sila',
          cpf: '111.111.111-11',
          telefone: '99999-9999',
          password : '$2a$12$ZnzGGsGGn1SkHc1AupyJhOhf5NMUvTPOuK8VnGVYhRJFTHJ0fITPK'
        },
        {
          nome: 'Henrique Sampaio',
          cpf: '222.222.222-22',
          telefone: '98888-8888',
          password : '$2a$12$uzSUE1SSazIXQfNiNQ661OX33VnSXTnkXITeYe.d6TsL6NlbFYvRG'
        },
        {
          nome: 'José Santos',
          cpf: '333.333.333-33',
          telefone: '97777-7777',
          password : '$2a$12$b7Sf3PlBclmxbCPIuBpLd.2JVIaHLsAUBmm7VEeSJaYT6BoH6/gUG'
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Motoboy', null, {});
  }
};
