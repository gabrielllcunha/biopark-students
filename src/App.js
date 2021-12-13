import React, { Component } from "react";
import { Routes , Route, Link } from "react-router-dom";
import AddAluno from './components/add-aluno.component';
import AlunosList from './components/aluno-list.component';
import Aluno from './components/aluno.component';
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/alunos" className="navbar-brand">
            Biopark - Alunos
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/alunos"} className="nav-link">
                Alunos
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Adicionar
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route exact path="/" component={<AlunosList/>} />
            <Route exact path="/alunos" component={<AlunosList/>} />
            <Route exact path="/add" component={<AddAluno/>} />
            <Route path="/alunos/:id" component={<Aluno/>} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;