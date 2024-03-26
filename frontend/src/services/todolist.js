import http from "../http-commons";
import { useState } from "react";

const useTaskListDataService = () => {
    const [tasks, setTasks] = useState([]);

  const getAll = async (page = 0) => {
    try {
      const response = await http.get(`?page=${page}`);
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  return {
    tasks, 
    getAll
  }
};

export default useTaskListDataService;