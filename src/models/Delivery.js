const Sequelize = require('sequelize');

class Delivery extends Sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        description: Sequelize.STRING,
        client: Sequelize.STRING,
        motoboy: Sequelize.STRING,
      },
      { sequelize }
    );
  }

  static associate(models) {}
}

module.exports = Delivery;
