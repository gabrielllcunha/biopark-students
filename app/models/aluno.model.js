module.exports = (sequelize, Sequelize) => {
    const Aluno = sequelize.define("aluno", {
      nome: {
        type: Sequelize.STRING
      },
      cpf: {
        type: Sequelize.STRING
      },
      data_nascimento: {
        type: Sequelize.DATE
      }
    });
  
    return Aluno;
  };