import React, { Component } from "react";
import StudentDataService from "../services/StudentDataService";
import { cpfMask } from "../utils/cpfMask";
import { birthdateMask } from "../utils/birthdateMask";

export default class AddStudents extends Component {
  constructor(props) {
    super(props);
    this.onChangeNome = this.onChangeNome.bind(this);
    this.onChangeCPF = this.onChangeCPF.bind(this);
    this.onChangeData = this.onChangeData.bind(this);
    this.saveAluno = this.saveAluno.bind(this);
    this.newAluno = this.newAluno.bind(this);

    this.state = {
      id: null,
      nome: "",
      cpf: "",
      data_nascimento: "",

      submitted: false,
    };
  }

  onChangeNome(e) {
    this.setState({
      nome: e.target.value,
    });
  }

  onChangeCPF(e) {
    this.setState({
      cpf: cpfMask(e.target.value),
    });
  }

  onChangeData(e) {
    this.setState({
      data_nascimento: birthdateMask(e.target.value),
    });
  }

  saveAluno() {
    var data = {
      id: this.state.id,
      nome: this.state.nome,
      cpf: this.state.cpf,
      data_nascimento: this.state.data_nascimento,
    };

    StudentDataService.create(data)
      .then((response) => {
        this.setState({
          id: response.data.id,
          nome: response.data.nome,
          cpf: response.data.cpf,
          data_nascimento: response.data.data_nascimento,

          submitted: true,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  newAluno() {
    this.setState({
      id: null,
      nome: "",
      cpf: "",
      data_nascimento: "",

      submitted: false,
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
          <div className="d-flex flex-column gap-4">
            <div className="d-flex gap-4 flex-wrap row">
              <div className="form-group col-sm-12 col-xl-4">
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

              <div className="form-group col-sm-12 col-xl-2">
                <label htmlFor="cpf">CPF</label>
                <input
                  type="text"
                  className="form-control"
                  minLength="14"
                  maxLength="14"
                  id="cpf"
                  value={this.state.cpf}
                  onChange={this.onChangeCPF}
                  name="cpf"
                />
              </div>

              <div className="form-group col-sm-12 col-xl-2">
                <label htmlFor="data_nascimento">Data de Nascimento</label>
                <input
                  type="text"
                  className="form-control"
                  minLength="8"
                  maxLength="8"
                  id="data_nascimento"
                  required
                  value={this.state.data_nascimento}
                  onChange={this.onChangeData}
                  name="data_nascimento"
                />
              </div>
            </div>

            <div className="d-flex w-100 justify-content-end">
              <button onClick={this.saveAluno} className="btn btn-success">
                Enviar
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}
