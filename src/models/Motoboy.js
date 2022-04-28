const Sequelize = require('sequelize');

class Motoboy extends Sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        cpf: Sequelize.STRING,
        password: Sequelize.STRING,
        telefone: Sequelize.STRING,
      },
      { sequelize }
    );
  }

  static associate(models) {}
}

module.exports = Motoboy;
