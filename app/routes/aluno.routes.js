module.exports = app => {
    const alunos = require("../controllers/aluno.controller.js");
    var router = require("express").Router();
  
    // Criar um novo aluno
    router.post("/", alunos.create);
  
    // Buscar um aluno com o id
    router.get("/:id", alunos.findOne);

    // Buscar todos os alunos
    router.get("/", alunos.findAll);
  
    app.use('/api/alunos', router);
  };