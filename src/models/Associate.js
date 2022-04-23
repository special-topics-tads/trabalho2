const Sequelize = require('sequelize');

class Associate extends Sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        company: Sequelize.STRING,
        cnpj: Sequelize.STRING,
        address: Sequelize.STRING,
        password: Sequelize.STRING
      },
      { sequelize }
    );
  }

  static associate(models) {}
}

module.exports = Associate;
