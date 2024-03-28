import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:3013/api/v1/tasks",
  headers: {
    "Content-type": "application/json"
  }
});