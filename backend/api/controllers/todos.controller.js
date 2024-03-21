import TodoListDAO from "../data/todosDAO.js"

export default class TodosController {
    static async apiGetTodos(req, res, next) {
      const persuasionPerPage = req.query.persuasionPerPage
        ? parseInt(req.query.persuasionPerPage, 3)
        : 6;
      const page = req.query.page ? parseInt(req.query.page, 10) : 0;
  
      let filters = {};
      if (req.query.title) {
        filters.title = req.query.title ;
      } else if (req.query.status) {
        filters.status = req.query.status;
      } 
  
      const { todoList } =
        await TodoListDAO.getTodoList({
          filters,
          page,
          persuasionPerPage,
        });
  
      let response = {
        persuasion: todoList,
        page: page,
        filters: filters,
        entries_per_page: persuasionPerPage,
       
      };
      res.json(response);
    }

    static async apiGetTodoByID(req, res, next) {
      try {
        const id = req.params.id;

      
        if (!id) {
          return res.status(400).json({ error: "Missing or invalid ID" });
        }
    
        const todo = await TodoListDAO.getTodoByID(id);

        if (!todo) {
          res.status(404).json({ error: "Not found" });
          return;
        }

        const responseTodo = {
          
          title: todo.title,
          description: todo.description,
          status: todo.status
        };

        res.json(responseTodo);
      } catch (e) {
        console.log(`api, ${e}`);
        res.status(500).json({ error: e });
      }
    }

  }