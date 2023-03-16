import express from "express";
import { config } from "dotenv";
import { GetUsersController } from "./controllers/getUsers/getUsers";
import { MongoGetUsersRepository } from "./repositories/get-users/mongo-get-users";
import { MongoClient } from "./database/mongo";
import { MongoCreateUserRepository } from "./repositories/create-user/mongo-create-user";
import { CreateUserController } from "./controllers/createUser/createUser";

const main = async () => {
  config();

  const app = express();

  app.use(express.json())

  await MongoClient.connect();

  app.get("/users", async (req, res) => {
    const getUsersRepository = new MongoGetUsersRepository();
    const getUsersController = new GetUsersController(getUsersRepository);

    const { body, statusCode } = await getUsersController.handle();

    res.send(body).status(statusCode);
  });

  app.post("/users", async (req, res) => {
    const mongoCreateUserRepository = new MongoCreateUserRepository();

    const createUserController = new CreateUserController(
      mongoCreateUserRepository
    );

    const { body, statusCode } = await createUserController.handle({
      body: req.body,
    });

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
