import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
import TodoListDAO from "./api/data/todosDAO.js"


dotenv.config()
const MongoClient = mongodb.MongoClient

const port = process.env.PORT || 8001

MongoClient.connect(
    process.env.TODOPERSUASION_DB_URI,
    {
      maxPoolSize: 3,
      wtimeoutMS: 2500,
      useNewUrlParser: true }
    )
    .catch(err => {
        console.error(err.stack)
        process.exit(1)
      })
      .then(async client => {
        await  TodoListDAO.injectDB(client)
       
        app.listen(port, () => {
          console.log(`listening on port ${port}`)
        })
      })
