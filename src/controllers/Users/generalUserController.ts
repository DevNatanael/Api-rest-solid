import { Request, Response } from "express";
import {
  MongoCreateUserRepository,
  MongoDeleteUserRepository,
  MongoGetUsersRepository,
  MongoUpdateUserRepository,
} from "../../repositories/Users";
import { CreateUserController } from "./createUser/createUser";
import { DeleteUserController } from "./deleteUser/deleteUser";
import { GetUsersController } from "./getUsers/getUsers";
import { UpdateUserController } from "./updateUser/updateUser";

export class GeneralUsersController {
  async getUsers(req: Request, res: Response) {
    const getUsersRepository = new MongoGetUsersRepository();
    const getUsersController = new GetUsersController(getUsersRepository);

    const { body, statusCode } = await getUsersController.handle();

    res.status(statusCode).send(body);
  }

  async createUsers(req: Request, res: Response) {
    const mongoCreateUserRepository = new MongoCreateUserRepository();

    const createUserController = new CreateUserController(
      mongoCreateUserRepository
    );

    const { body, statusCode } = await createUserController.handle({
      body: req.body,
    });

    res.status(statusCode).send(body);
  }

  async updateUser(req: Request, res: Response) {
    const mongoUpdateUsersRepository = new MongoUpdateUserRepository();

    const updateUserController = new UpdateUserController(
      mongoUpdateUsersRepository
    );

    const { body, statusCode } = await updateUserController.handle({
      body: req.body,
      params: req.params,
    });

    res.status(statusCode).send(body);
  }

  async deleteUser(req: Request, res: Response) {
    const mongoDeleteUsersRepository = new MongoDeleteUserRepository();

    const deleteUserController = new DeleteUserController(
      mongoDeleteUsersRepository
    );

    const { body, statusCode } = await deleteUserController.handle({
      params: req.params,
    });

    res.status(statusCode).send(body);
  }
}
