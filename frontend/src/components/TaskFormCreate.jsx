import React, { useState } from 'react'
import http from "../http-commons.js";
import { useNavigate, Link } from "react-router-dom";
import { v4 as uuid } from "uuid";

function TaskFormCreate () {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("");

    let history = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const ids = uuid();

        let uniqueId = ids.slice(0,8);
        
        const data = {
            title: title,
            description: description,
            status: status
        }
        const response = await http.post("/", data);
        console.log(response.data);
    }
  return (
    <div>TaskFormCreate</div>
  )
}

export default TaskFormCreate