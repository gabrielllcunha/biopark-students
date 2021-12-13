const db = require("../models");
const Aluno = db.alunos;
const Op = db.Sequelize.Op;


// Criar um novo aluno
exports.create = (req, res) => {
    // Validar
    if (!req.body.nome) {
        res.status(400).send({
          message: "Valor não pode ser vazio!"
        });
        return;
    }

    // Criar
    const alunos = {
        nome: req.body.nome,
        cpf: req.body.cpf,
        data_nascimento: req.body.data_nascimento,
    };

    // Salvar
    Aluno.create(alunos)
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Ocorreu algum erro durante a criação do aluno."
        });
    });
};

// Encontrar um aluno com o id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Aluno.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Não foi possível encontrar o aluno com o id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Erro ao recuperar o aluno com o id=" + id
        });
      });
};

// Listar todos os alunos
exports.findAll = (req, res) => {
  const nome = req.query.nome;
  var condition = nome ? { nome: { [Op.like]: `%${nome}%` } } : null;

  Aluno.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Erro ao listar os alunos."
      });
    });
};