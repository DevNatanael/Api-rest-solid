/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CreateUserParams,
  ICreateUserRepository,
} from "../../../controllers/Users/createUser/protocolCreateUser";
import { MongoClient } from "../../../database/mongo";
import { User } from "../../../models/user";
import { hash } from "bcrypt";

export class MongoCreateUserRepository implements ICreateUserRepository {
  async createUser(params: CreateUserParams): Promise<User> {
    const passwordHash = await hash(params.password, 10);

    const { password, ...data } = params;

    const { insertedId } = await MongoClient.db
      .collection("users")
      .insertOne({ ...data, password: passwordHash });

    const user = await MongoClient.db
      .collection<Omit<User, "id">>("users")
      .findOne({ _id: insertedId });

    if (!user) {
      throw new Error("Usuário não foi criado");
    }

    const { _id, ...rest } = user;

    return { id: _id.toHexString(), ...rest };
  }
}
