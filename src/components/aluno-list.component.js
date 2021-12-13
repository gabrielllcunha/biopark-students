import React, { Component } from "react";
// import AlunoDataService from "../services/aluno.service";
import { Link } from "react-router-dom";

export default class AlunosList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchNome = this.onChangeSearchNome.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveAluno = this.setActiveAluno.bind(this);

    this.state = {
      alunos: [],
      currentAluno: null,
      currentIndex: -1,
      searchNome: ""
    };
  }

  componentDidMount() {
    this.retrieveAlunos();
  }

  onChangeSearchNome(e) {
    const searchNome = e.target.value;

    this.setState({
      searchNome: searchNome
    });
  }

  refreshList() {
    this.retrieveAlunos();
    this.setState({
      currentAluno: null,
      currentIndex: -1
    });
  }

  setActiveAluno(aluno, index) {
    this.setState({
      currentAluno: aluno,
      currentIndex: index
    });
  }


  render() {
    const { searchNome, alunos, currentAluno, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Procurar por nome"
              value={searchNome}
              onChange={this.onChangeSearchNome}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchNome}
              >
                Procurar
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Lista de Alunos</h4>

          <ul className="list-group">
            {alunos &&
              alunos.map((aluno, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveAluno(aluno, index)}
                  key={index}
                >
                  {aluno.nome}
                </li>
              ))}
          </ul>
        </div>
        <div className="col-md-6">
          {currentAluno ? (
            <div>
              <h4>Aluno</h4>
              <div>
                <label>
                  <strong>Nome:</strong>
                </label>{" "}
                {currentAluno.nome}
              </div>
              <div>
                <label>
                  <strong>CPF:</strong>
                </label>{" "}
                {currentAluno.cpf}
              </div>
              <div>
                <label>
                  <strong>Data de Nascimento:</strong>
                </label>{" "}
                {currentAluno.data_nascimento}
              </div>

              <Link
                to={"/alunos/" + currentAluno.id}
                className="badge badge-warning"
              >
                Editar
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Selecione um aluno</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}