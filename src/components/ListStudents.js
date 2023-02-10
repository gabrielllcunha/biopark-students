import React, { Component } from "react";
import { Link } from "react-router-dom";
import http from "../http-common";

export default class ListStudents extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchName = this.onChangeSearchName.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveStudent = this.setActiveStudent.bind(this);

    this.state = {
      students: [],
      currentStudent: null,
      currentIndex: -1,
      searchName: "",
    };
  }

  retrieveStudents() {
    http
      .get("/students")
      .then((response) => {
        this.setState({
          students: response.data,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  searchName() {
    http
      .get(`/students?name=${this.state.searchName}`)
      .then((response) => {
        this.setState({
          students: response.data,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  componentDidMount() {
    this.retrieveStudents();
  }

  onChangeSearchName(e) {
    const searchName = e.target.value;

    this.setState({
      searchName: searchName,
    });
  }

  refreshList() {
    this.retrieveStudents();
    this.setState({
      currentStudent: null,
      currentIndex: -1,
    });
  }

  setActiveStudent(student, index) {
    this.setState({
      currentStudent: student,
      currentIndex: index,
    });
  }

  render() {
    const { searchName, students, currentStudent, currentIndex } = this.state;

    return (
      <div className="list">
        <div className="col-md-6">
          <div className="mb-3 gap-2 d-flex">
            <input
              type="text"
              className="form-control col-sm-10"
              placeholder="Procurar aluno"
              value={searchName}
              onChange={this.onChangeSearchName}
            />
            <div>
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchName}
              >
                Procurar
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <h4>Lista de Alunos</h4>

          <ul className="list-group">
            {students &&
              students.map((student, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveStudent(student, index)}
                  key={index}
                >
                  {student.name}
                </li>
              ))}
          </ul>
        </div>
        <div className="col-md-6">
          {currentStudent ? (
            <div>
              <h4>Aluno</h4>
              <div>
                <label>
                  <strong>Nome:</strong>
                </label>{" "}
                {currentStudent.nome}
              </div>
              <div>
                <label>
                  <strong>CPF:</strong>
                </label>{" "}
                {currentStudent.cpf}
              </div>
              <div>
                <label>
                  <strong>Data de Nascimento:</strong>
                </label>{" "}
                {currentStudent.data_nascimento}
              </div>

              <Link
                to={"/students/" + currentStudent.id}
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
