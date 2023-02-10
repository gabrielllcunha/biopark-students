import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import AddStudent from "./components/AddStudent";
import ListStudents from "./components/ListStudents";
import Student from "./components/Student";
import logoBiopark from "../src/layout/images/logoBiopark1.svg";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  render() {
    return (
      <div className="main-background">
        <nav className="navbar navbar-expand navbar-dark bg-dark p-4 gap-4 biopark-header flex-wrap">
          <a href="/" className="navbar-brand">
            <img src={logoBiopark} width="150" alt="Biopark Logo" />
          </a>
          <div className="navbar-nav mr-auto gap-2">
            <li className="nav-item">
              <Link to={"/students"} className="nav-link">
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
            <Route exact path="/" element={<ListStudents />} />
            <Route exact path="/students" element={<ListStudents />} />
            <Route exact path="/add" element={<AddStudent />} />
            <Route path="/students/:id" element={<Student />} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;
