const Sequelize = require('sequelize');

class Client extends Sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        company: Sequelize.STRING,
        cnpj: Sequelize.STRING,
        address: Sequelize.STRING,
      },
      { sequelize }
    );
  }

  static associate(models) {}
}

module.exports = Client;
