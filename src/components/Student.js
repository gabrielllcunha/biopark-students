import React, { Component } from "react";
import StudentDataService from "../services/StudentDataService";

export default class Student extends Component {
  constructor(props) {
    super(props);
    this.onChangeNome = this.onChangeNome.bind(this);
    this.getAluno = this.getAluno.bind(this);

    this.state = {
      currentStudent: {
        id: null,
        nome: "",
        cpf: "",
        data_nascimento: "",
      },
      message: "",
    };
  }

  componentDidMount() {
    this.getAluno(this.props.match.params.id);
  }

  onChangeNome(e) {
    const nome = e.target.value;

    this.setState(function (prevState) {
      return {
        currentStudent: {
          ...prevState.currentStudent,
          nome: nome,
        },
      };
    });
  }

  getAluno(id) {
    StudentDataService.get(id)
      .then((response) => {
        this.setState({
          currentStudent: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { currentStudent } = this.state;

    return (
      <div>
        {currentStudent ? (
          <div className="edit-form">
            <h4>Aluno</h4>
            <form>
              <div className="form-group">
                <label htmlFor="nome">Nome</label>
                <input
                  type="text"
                  className="form-control"
                  id="nome"
                  value={currentStudent.nome}
                  onChange={this.onChangeNome}
                />
              </div>
              <div className="form-group">
                <label htmlFor="cpf">CPF</label>
                <input
                  type="text"
                  className="form-control"
                  id="cpf"
                  value={currentStudent.cpf}
                />
              </div>
              <div className="form-group">
                <label htmlFor="data_nascimento">Data de Nascimento</label>
                <input
                  type="date"
                  className="form-control"
                  id="data_nascimento"
                  value={currentStudent.data_nascimento}
                />
              </div>
            </form>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Selecione um aluno</p>
          </div>
        )}
      </div>
    );
  }
}
