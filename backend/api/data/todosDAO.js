import { ObjectId } from "mongodb";

let persuasion;

export default class TodoListDAO {
  static async injectDB(conn) {
    if (persuasion) {
      return;
    }
    try {
      persuasion = await conn
        .db(process.env.TODOPERSUASION_NS)
        .collection("persuasion");
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in TodoListDAO: ${e}`
      );
    }
  }

  static async getTodoList({
    filters = null,
    page = 0,
    persuasionPerPage = 5,
  }) {
    let query = {};
    if (filters) {
      if ("title" in filters) {
        query.title =  filters["title"];
      } else if ("status" in filters) {
        query.status =  filters["status"];
      }
    }
  

    try {
      const sortedQuery = { ...query }; // Copy query for sorting
      // sortedQuery.sort = { _id: 1 };

      const todoList = await persuasion
      .find(sortedQuery)
      .sort({ status: -1 })
      .limit(persuasionPerPage)
      .skip(persuasionPerPage * page)
      .toArray();

      return { todoList };
    } catch (e) {
      console.error(
        `error fetching todo list, ${e}`
      );
      return { todoList: [] };
    }
  }

  static async getTodoByID(id) {
    try {
      const todo = await persuasion.findOne({
        _id: new ObjectId(id),
      })
     
      if (!todo) {
        throw new Error(`Todo with ID ${id} not found`);
      }

      return todo;
    } catch (e) {
      console.error(`Error in getTodoByID: ${e}`);
      throw e;
    }
  }

  static async addTodo(title, description, status) {
    try {
      const newTodo = {
        title: title,
        description: description,
        status: status,
      };
      return await persuasion.insertOne(newTodo);
    } catch (e) {
      console.error(`Unable to post review: ${e}`);
      return { error: e };
    }
  }

  // Updates the task identified by `id`. Can update `title`, `description`, and/or `status`
  static async updateTodo(taskId, title, description, status) {
    try {
      const updateResponse = await persuasion.updateOne(
        { _id: taskId,},
        { $set: { title: title, description: description, status:status } }
      );

      return updateResponse;
    } catch (e) {
      console.error(`Unable to update review: ${e}`);
      return { error: e };
    }
  }

  static async deleteTodo(taskId) {
    try {
      const deleteResponse = await persuasion.deleteOne({
        _id: taskId
      });

      return deleteResponse;
    } catch (e) {
      console.error(`Unable to delete review: ${e}`);
      return { error: e };
    }
  }

}
