import express from 'express';
var router = express.Router();
import TodosCTRL from "../controllers/todos.controller.js"

/* GET home page. */
router.route("/").get(TodosCTRL.apiGetTodos)
router.route("/id/:id").get(TodosCTRL.apiGetTodoByID)

export default router
