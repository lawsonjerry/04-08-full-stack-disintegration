import TodoListDAO from "../data/todosDAO.js";

export default class TodosController {
  static async apiGetTodos(req, res, next) {
    const persuasionPerPage = req.query.persuasionPerPage
      ? parseInt(req.query.persuasionPerPage, 3)
      : 6;
    const page = req.query.page ? parseInt(req.query.page, 10) : 0;

    let filters = {};
    if (req.query.title) {
      filters.title = req.query.title;
    } else if (req.query.status) {
      filters.status = req.query.status;
    }

    const { todoList } = await TodoListDAO.getTodoList({
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
        status: todo.status,
      };

      res.json(responseTodo);
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }

  static async apiAddTodo(req, res, next) {
    try {
      const title = req.body.title;
      const description = req.body.description;
      const status = req.body.status;

      const responsePostTodo = await TodoListDAO.addTodo(
        title,
        description,
        status
      );
      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiUpdateTodo(req, res, next) {
    try {
      const reviewId = req.body.review_id;
      const text = req.body.text;

      const reviewResponse = await TodoListDAO.updateReview(
        reviewId,
        req.body.user_id,
        text
      );

      // const { error } = reviewResponse;
      // if (error) {
      //   res.status(400).json({ error });
      // }

      // if (reviewResponse.modifiedCount === 0) {
      //   throw new Error(
      //     "unable to update review - user may not be original poster"
      //   );
      // }

      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiDeleteTodo(req, res, next) {
    try {
      const {id} = req.params;
      console.log(id)
      const reviewResponse = await TodoListDAO. deleteTodo(
        id,
      );

      console.log(reviewResponse)

     // ? Add Validation and play around with it in the near future
      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

}
