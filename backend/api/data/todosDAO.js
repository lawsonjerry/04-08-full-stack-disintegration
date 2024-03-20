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
      } = {}) {
        let query;
        if (filters) {
          if ("title" in filters) {
            query = { title: { $search: filters["title"] } };
          } else if ("status" in filters) {
            query = { status: { $eq: filters["status"] } };
          } 
        }
        
        let cursor;

        try {
          cursor = await persuasion.find(query);
        } catch (e) {
          console.error(`Unable to issue find command, ${e}`);
          return { todoList: []};
        }
        const displayCursor = cursor
          .limit(persuasionPerPage)
          .skip(persuasionPerPage * page);
    
        try {
          const todoList = await displayCursor.toArray();
          return { todoList };
        } catch (e) {
          console.error(
            `Unable to convert cursor to array or problem counting documents, ${e}`
          );
          return { todoList: []};
        }
      }

}