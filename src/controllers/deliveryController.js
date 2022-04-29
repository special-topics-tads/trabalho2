const Sequelize = require('sequelize');
const Delivery = require('../models/Delivery');

module.exports = {
    async newDelivery(req, res) {
        const { description, client, motoboy } = req.body;
        if (!description || !client || !motoboy)
          return res.status(400).json({ msg: 'Dados obrigatórios não foram preenchidos.' });
        else {
          const delivery = await Delivery.create({
            description,
            client,
            motoboy,
          }).catch((error) => {
            return res.status(500).json({ msg: 'Não foi possível inserir os dados.' });
          });
          return delivery
            ? res.status(201).json({ msg: 'Nova entrega foi adicionada.' })
            : res.status(400).json({ msg: 'Não foi possível cadastrar nova entrega.' });
        }        
      },
      async listAll(req, res) {
        const deliveries = await Delivery.findAll({
          order: [['nome', 'ASC']],
        }).catch((err) => {
          return res.status(500).json({ msg: 'Falha na conexão.' });
        });
        return deliveries
          ? res.status(200).json({ deliveries })
          : res.status(404).json({ msg: 'Não foi possível encontrar Deliverys.' });
      },

      async deleteDelivery(req, res, next) {
        const deliveryId = req.params?.id;
    
        const deletedDelivery = await Delivery.destroy({
          where: { id: deliveryId },
        });
    
        return deletedDelivery
          ? res.status(200).json({ msg: 'Entrega excluída com sucesso.' })
          : res.status(404).json({ msg: 'Entrega não encontrada.' });
      },
};
