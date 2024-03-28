//Displays all tasks in a list or table format.
import React, { useEffect, useState, Fragment } from "react";
import useTaskListDataService from "../services/todolist.js";
// import styled from "styled-components";
// import Cards from '@mui/material/Card'
import { Button, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, Link, BrowserRouter as Router, Routes, Route, useParams } from "react-router-dom";


const TasksList = (props) => {
    const [tasks, setTasks] = useState([]);
    const { getAll} = useTaskListDataService();

    let history = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const getData = async () => {
            const response = await getAll();
            setTasks(response);
        };
        getData();
 }, []);

 const handleEdit = (id, title, description, status) => {
    localStorage.setItem("Title", title);
    localStorage.setItem("Description", description);
    localStorage.setItem("Id", id);
    localStorage.setItem("Status", status);
  }

  const handleDelete = (id) => {
    const index = tasks.map(function (e) {
      return e.id;
    }).indexOf(id);
    console.log(index);
    tasks.splice(index, 1);

history("/");
}

    return (

        <Fragment>

<div style={{ margin: "10rem" }}></div>
<Table striped bordered hover size="sm">
        <thead>
            <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            </tr>
            </thead>
            <tbody>
            {tasks && tasks.length > 0
            ? tasks.map((item) => {
                return (
                    <tr key={item.id}>
                        <td>{item._id}</td>
                    <td>{item.title}</td>
                    <td>{item.description}</td>
                    <td>{item.status}</td>


                      </tr>
              )
                  }
            ) 
            : "No Data Available"}
              </tbody>
        
          </Table>
          <Link className='d-grid gap-2' to={"/create"}>
          <Button size="lg">Create</Button>
        </Link>


</Fragment>
)

}

export default TasksList