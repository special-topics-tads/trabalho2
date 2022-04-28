const Sequelize = require('sequelize');
const bcrypt = require("bcryptjs");
const Motoboy = require('../models/Motoboy');
const cpfValidator = require('cpf-cnpj-validator').cpf; // https://www.npmjs.com/package/cpf-cnpj-validator

module.exports = {
    async newMotoboy(req, res) {
        const { nome, cpf, telefone, password } = req.body;
        if (!nome || !cpf || !telefone || !password)
          return res.status(400).json({ msg: 'Dados obrigatórios não foram preenchidos.' });
    
        if (!cpfValidator.isValid(cpf)) return res.status(400).json({ msg: 'CPF inválido.'});
    
        const cpfExists = await Motoboy.findOne({
          where: { cpf },
        });
    
        if (cpfExists) return res.status(403).json({ msg: 'Já existe um motoboy com este CPF.' });
        else {
          const salt = bcrypt.genSaltSync(12);
			    const hash = bcrypt.hashSync(password, salt);
          const motoboy = await Motoboy.create({
            nome,
            cpf,
            telefone,
            password : hash,
          }).catch((error) => {
            return res.status(500).json({ msg: 'Não foi possível inserir os dados.' });
          });
          return motoboy
            ? res.status(201).json({ msg: 'Novo motboy foi adicionado.' })
            : res.status(400).json({ msg: 'Não foi possível cadastrar novo motoboy.' });
        }        
      },
      async listAll(req, res) {
        const motoboys = await Motoboy.findAll({
          order: [['nome', 'ASC']],
        }).catch((err) => {
          return res.status(500).json({ msg: 'Falha na conexão.' });
        });
        return motoboys
          ? res.status(200).json({ motoboys })
          : res.status(404).json({ msg: 'Não foi possível encontrar Motoboys.' });
      },

      async searchMotoboyById(req, res) {
        const motoboyId = req.params?.id;
        if (!motoboyId) return res.status(400).json({ msg: 'Parâmetro id está vazio.' });
    
        const motoboy = await Motoboy.findByPk(motoboyId);
    
        return motoboy ? res.status(200).json({ motoboy }) : res.status(404).json({ msg: 'Motoboy não encontrado.' });
      },
      
      async searchMotoboyByCPF(req, res) {
        const { cpf } = req.body;
        if (!cpf) return res.status(400).json({ msg: 'Informe um CPF válido.' });
    
        const motoboy = await Motoboy.findOne({ where: { cpf } }).catch((err) => {
          return res.status(500).json({ msg: 'Falha na conexão.' });
        });
    
        return motoboy ? res.status(200).json({ motoboy }) : res.status(404).json({ msg: 'Motoboy não encontrado.' });
      },
      async deleteMotoboy(req, res, next) {
        const motoboyId = req.params?.id;
    
        const deletedMotoboy = await Motoboy.destroy({
          where: { id: motoboyId },
        });
    
        return deletedMotoboy
          ? res.status(200).json({ msg: 'Motoboy excluído com sucesso.' })
          : res.status(404).json({ msg: 'Motoboy não encontrado.' });
      },

};
