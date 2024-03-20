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
  }