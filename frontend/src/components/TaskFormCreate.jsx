import React, { useState } from "react";
import http from "../http-commons.js";
import useTaskListDataService from "../services/todolist.js";
import { useNavigate, Link } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function TaskFormCreate() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const { createTask } = useTaskListDataService();
  const history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const uniqueId = Math.random().toString(36).substring(2, 15);

    const data = {
      id: uniqueId,
    title: title,
      description: description,
      status: status,
    };
    try {
    const response = await createTask(data);
    console.log('Task created successfully:',response.data);

    history.push('/');
    } catch (error) {
        console.error('Error creating task:', error);

        alert('Failed to create task. Please try again.');
    }
  };
  return (
    <div className="container mt-5">
      <Form onSubmit={handleSubmit} >
        <Form.Group className="mb-3">
        <Form.Label htmlFor="formTitle">Title</Form.Label>
          <Form.Control
            typeof="text"
            placeholder="Enter Title"
            required value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            typeof="text"
            placeholder="Enter Description"
            required value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            typeof="text"
            placeholder="Enter Status"
            required value={status}
            onChange={(e) => setStatus(e.target.value)}
          />
        </Form.Group>
        <Button type="submit" variant="primary" >
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default TaskFormCreate;
