import http from "../http-common";

class AlunoDataService {

  get(id) {
    return http.get(`/alunos/${id}`);
  }

  create(data) {
    return http.post("/alunos", data);
  }
}

export default new AlunoDataService();