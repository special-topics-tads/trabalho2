const Associate = require('../models/Associate');
const Sequelize = require('sequelize');
const cnpjValidator = require('cpf-cnpj-validator').cnpj; // https://www.npmjs.com/package/cpf-cnpj-validator
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

function newAssociateValidator (req) {
	const body = req.body;
	const schema = Joi.object().keys({
		company: Joi.string().required(),
		cnpj: Joi.string().required(),
    address: Joi.string(),
		password: Joi.string().min(8)
			.pattern(/^([\d]+[a-z]|[a-z]+[\d])[\da-z]*$/i)
			.required(),
	});
	const { error, value } = schema.validate(body);
	if (error) return { validator: false, error: error.details, value };
	else return { validator: true, error, value };
}

function generateToken(id) {
	process.env.JWT_SECRET = Math.random().toString(36).slice(-20);
	const token = jwt.sign({ id }, process.env.JWT_SECRET, {expiresIn: 82800, }); // Token expira em 24 horas
	return token;
}

module.exports = {
  async authentication(req, res) {
		try {
			const { cnpj, password } = req.body;
			const associate = await Associate.findOne({
				where: { cnpj },
			});
			if (!associate)
				return res.status(404).json({ msg: "Usuário ou senha inválidos!" });
			else {
				if (bcrypt.compareSync(password, associate.password)) {
					const token = generateToken(associate.id);
					return res.status(200).json({ msg: "Autenticado com sucesso", token });
				}
				else
					return res.status(404).json({ msg: "Usuário ou senha inválidos." });
			}
		} catch (error) {
			res.status(500).json({msg : error});
		}
	},

  async newAssociate(req, res) {
    const { validator, error, value } = newAssociateValidator(req);
    if (!validator)
      return res.status(400).json({ msg: 'Dados obrigatórios não foram preenchidos ou inválidos.' });
    if (!cnpjValidator.isValid(value.cnpj)) return res.status(400).json({ msg: 'CNPJ inválido.' });

    const cnpjExists = await Associate.findOne({
      where: { cnpj: value.cnpj },
    });

    if (cnpjExists) return res.status(403).json({ msg: 'Já existe um associado com este CNPJ.' });
    else {
      const salt = bcrypt.genSaltSync(12);
			const hash = bcrypt.hashSync(value.password, salt);
      const associate = await Associate.create({
      company: value.company,
      cnpj: value.cnpj,
      address: value.address,
      password: hash
      }).catch((error) => {
        return res.status(500).json({ msg: 'Não foi possível inserir os dados.', error });
      });
      return associate
      ? res.status(201).json({ msg: 'Novo Associado foi adicionado.' })
      : res.status(400).json({ msg: 'Não foi possível cadastrar novo Associado.' });
    }
  },

  async listAll(req, res) {
    const associates = await Associate.findAll({
      order: [['company', 'ASC']],
    }).catch((err) => {
      return res.status(500).json({ msg: 'Falha na conexão.' });
    });
    return associates
      ? res.status(200).json({ associates })
      : res.status(404).json({ msg: 'Não foi possível encontrar Associados.' });
  },

  async searchAssociateByName(req, res) {
    const { associateName } = req.body;
    if (!associateName) return res.status(400).json({ msg: 'Informe um Nome.' });

    const associate = await Associate.findOne({ where: { associateName } }).catch((err) => {
      return res.status(500).json({ msg: 'Falha na conexão.' });
    });

    return associate ? res.status(200).json({ associate }) : res.status(404).json({ msg: 'Associado não encontrado.' });
  },

  async updateAssociate(req, res) {
    const _cnpj = req.params;
    const associate = req.body;
    if (!_cnpj) return res.status(400).json({ msg: 'CNPJ do cliente está vazio.' });
    if (!cnpjValidator.isValid(_cnpj)) return res.status(400).json({ msg: 'CNPJ inválido.' });
    else {
      const searchAssociate = await Associate.findOne({ where: { _cnpj } }).catch((err) => {
        return res.status(500).json({ msg: 'Falha na conexão.' });
      });
      if (!searchAssociate) return res.status(404).json({ msg: 'Associado não encontrado.' });
      if (!associate.company || !associate.cnpj || !associate.password) {
        if (!cnpjValidator.isValid(associate.cnpj)) return res.status(400).json({ msg: 'CNPJ inválido.' });
        await Associate.update(associate, {
          where: { cnpj: _cnpj },
        });
        return res.status(200).json({ msg: 'Associado atualizado com sucesso.' });
      }
      return res.status(400).json({ msg: 'Campos obrigatórios não preenchidos.' });
    }
  },

  async deleteAssociate(req, res, next) {
    const _cnpj = req.params;

    if (!_cnpj) return res.status(400).json({ msg: 'CNPJ do associado está vazio.' });

    const deletedAssociate = await Associate.destroy({
      where: { cnpj: _cnpj },
    });

    return deletedAssociate
      ? res.status(200).json({ msg: 'Associado excluído com sucesso.' })
      : res.status(404).json({ msg: 'Associado não encontrado.' });
  },
};