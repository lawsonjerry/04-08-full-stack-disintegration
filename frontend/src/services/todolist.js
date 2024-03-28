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

  const createTask = async (newTaskData) => {
    try {
      const response = await http.post("/", newTaskData);
      if (!response.ok) {
        throw new Error(`Failed to create task with status: ${response.status}`);
      }
      console.log("Task created successfully:", response.data.persuasion); // Handle response
      return response.data.persuasion;
    } catch (error) {
      console.error("Error creating task", error);
      throw new Error ("Failed to create task. Please try again.")
    }
  };

  return {
    tasks, 
    getAll, 
    createTask
  }
};

export default useTaskListDataService;