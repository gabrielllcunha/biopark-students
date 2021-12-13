import React, { Component } from "react";
import AlunoDataService from "../services/aluno.service";

export default class AddAluno extends Component {
  constructor(props) {
    super(props);
    this.onChangeNome = this.onChangeNome.bind(this);
    this.saveAluno = this.saveAluno.bind(this);
    this.newAluno = this.newAluno.bind(this);

    this.state = {
      id: null,
      nome: "",
      cpf: "",
      data_nascimento: "",

      submitted: false
    };
  }

  onChangeNome(e) {
    this.setState({
      nome: e.target.value
    });
  }

  saveAluno() {
    var data = {
      id: this.state.id,
      nome: this.state.nome,
      cpf: this.state.cpf,
      data_nascimento: this.state.data_nascimento
    };

    AlunoDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          nome: response.data.nome,
          cpf: response.data.cpf,
          data_nascimento: response.data.data_nascimento,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newAluno() {
    this.setState({
      id: null,
      nome: "",
      cpf: "",
      data_nascimento: "",

      submitted: false
    });
  }

  render() {
    return (
        <div className="submit-form">
          {this.state.submitted ? (
            <div>
              <h4>Você enviou com sucesso!</h4>
              <button className="btn btn-success" onClick={this.newAluno}>
                Adicionar
              </button>
            </div>
          ) : (
            <div>
              <div className="form-group">
                <label htmlFor="nome">Nome</label>
                <input
                  type="text"
                  className="form-control"
                  id="nome"
                  required
                  value={this.state.nome}
                  onChange={this.onChangeNome}
                  name="nome"
                />
              </div>
  
              <div className="form-group">
                <label htmlFor="cpf">CPF</label>
                <input
                  type="text"
                  className="form-control"
                  id="cpf"
                  required
                  value={this.state.cpf}
                  name="cpf"
                />
              </div>

              <div className="form-group">
                <label htmlFor="data_nascimento">Data de Nascimento</label>
                <input
                  type="text"
                  className="form-control"
                  id="data_nascimento"
                  required
                  value={this.state.data_nascimento}
                  name="data_nascimento"
                />
              </div>
  
              <button onClick={this.saveTutorial} className="btn btn-success">
                Enviar
              </button>
            </div>
          )}
        </div>
      );
  }
}