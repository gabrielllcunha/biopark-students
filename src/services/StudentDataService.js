import http from "../http-common";

class StudentDataService {
  get(id) {
    return http.get(`/students/${id}`);
  }

  create(data) {
    return http.post("/students", data);
  }
}

const studentDataService = new StudentDataService();
export default studentDataService;
