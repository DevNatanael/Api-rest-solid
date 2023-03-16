import express from "express";
import { config } from "dotenv";
import { GetUsersController } from "./controllers/getUsers/getUsers";
import { MongoGetUsersRepository } from "./repositories/get-users/mongo-get-users";
import { MongoClient } from "./database/mongo";

const main = async () => {
  config();

  const app = express();

  await MongoClient.connect();

  app.get("/users", async (req, res) => {
    const getUsersRepository = new MongoGetUsersRepository();
    const getUsersController = new GetUsersController(getUsersRepository);

    const { body, statusCode } = await getUsersController.handle();

    res.send(body).status(statusCode);
  });

  const port = process.env.PORT;

  app.listen(port, () =>
    console.table({
      Server: "Server is running 🚀",
      Port: port,
      DataBase: process.env.MONGODB_URL,
    })
  );
};

main();
