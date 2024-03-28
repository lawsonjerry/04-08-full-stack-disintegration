import http from "../http-commons.js";
import { useState } from "react";

const useTaskListDataService = () => {
    const [tasks, setTasks] = useState([]);

  const getAll = async (page = 0) => {
    try {
      const response = await http.get(`?page=${page}`);
      console.log(response.data.persuasion);
      return response.data.persuasion;
     
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const createTask = async (data) => {
    try {
      const response = await http.post("/", data);
      console.log("Review created successfully:", response.data.persuasion); // Handle response
      return response.data.persuasion;
    } catch (error) {
      console.error("Error creating task", error);
    }
  };

  return {
    tasks, 
    getAll
  }
};

export default useTaskListDataService;