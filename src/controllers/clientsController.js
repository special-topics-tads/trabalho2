const Client = require('../models/Client');
const Sequelize = require('sequelize');
import { cnpj as cnpjValidator } from 'cpf-cnpj-validator'; // https://www.npmjs.com/package/cpf-cnpj-validator

module.exports = {
  async newClient(req, res) {
    const { company, cnpj, address } = req.body;
    if (!company || !cnpj || !address)
      return res.status(400).json({ msg: 'Dados obrigatórios não foram preenchidos.' });

    if (!cnpjValidator.isValid(cnpj)) return res.status(400).json({ msg: 'CNPJ inválido.' });

    const cnpjExists = await Client.findOne({
      where: { cnpj },
    });

    if (cnpjExists) return res.status(403).json({ msg: 'Já existe um cliente com este CNPJ.' });
    else {
      const client = await Client.create({
        company,
        cnpj,
        address,
      }).catch((error) => {
        return res.status(500).json({ msg: 'Não foi possível inserir os dados.' });
      });
      return client
        ? res.status(201).json({ msg: 'Novo cliente foi adicionado.' })
        : res.status(400).json({ msg: 'Não foi possível cadastrar novo cliente.' });
    }
  },

  async listAll(req, res) {
    const clients = await Client.findAll({
      order: [['company', 'ASC']],
    }).catch((err) => {
      return res.status(500).json({ msg: 'Falha na conexão.' });
    });
    return clients
      ? res.status(200).json({ clients })
      : res.status(404).json({ msg: 'Não foi possível encontrar clientes.' });
  },

  async searchClientById(req, res) {
    const clientId = req.params?.id;
    if (!clientId) return res.status(400).json({ msg: 'Parâmetro id está vazio.' });

    const client = await Client.findByPk(clientId);

    return client ? res.status(200).json({ client }) : res.status(404).json({ msg: 'Cliente não encontrado.' });
  },

  async updateClient(req, res) {
    const clientId = req.params?.id;
    const client = req.body;
    if (!clientId) return res.status(400).json({ msg: 'ID do cliente está vazio.' });
    else {
      const clientExists = await Client.findByPk(clientId);
      if (!clientExists) return res.status(404).json({ msg: 'Cliente não encontrado.' });
      if (client.company || client.cnpj || client.address) {
        if (!cnpjValidator.isValid(client.cnpj)) return res.status(400).json({ msg: 'CNPJ inválido.' });
        await Client.update(client, {
          where: { id: clientId },
        });
        return res.status(200).json({ msg: 'Cliente atualizado com sucesso.' });
      }
      return res.status(400).json({ msg: 'Campos obrigatórios não preenchidos.' });
    }
  },

  async deleteClient(req, res, next) {
    const clientId = req.params?.id;

    const deletedClient = await Client.destroy({
      where: { id: clientId },
    });

    return clientId
      ? res.status(200).json({ msg: 'Cliente excluído com sucesso.' })
      : res.status(404).json({ msg: 'Cliente não encontrado.' });
  },
};
