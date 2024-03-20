import express from 'express';
import cors from 'cors';
import todoroutes from "./api/routes/todo.routes.js"

const app = express();

app.use(cors())
app.use(express.json())

app.use("/api/v1/tasks", todoroutes)
app.use("*", (req, res) => res.status(404).json({ error: "not found"}))

export default app