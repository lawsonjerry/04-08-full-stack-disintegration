import express from "express";
var router = express.Router();
import TodosCTRL from "../controllers/todos.controller.js";

/* GET home page. */
router.route("/").get(TodosCTRL.apiGetTodos);
router.route("/:id").get(TodosCTRL.apiGetTodoByID);
router.route("/").post(TodosCTRL.apiAddTodo);
router.route("/:id").delete(TodosCTRL.apiDeleteTodo);
router.route("/:id").put(TodosCTRL.apiUpdateTodo)

export default router;
