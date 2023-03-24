/* eslint-disable @typescript-eslint/no-unused-vars */
import { IGetSingleUserRepository } from "../../../controllers/Users/getSingleUser/getSingleUserProtocol";
import { MongoClient } from "../../../database/mongo";
import { User } from "../../../models/user";
import { ObjectId } from "mongodb";

export class MongoGetSingleUserRepository implements IGetSingleUserRepository {
  async getSingleUser(id: string): Promise<User> {
    const user = await MongoClient.db
      .collection<Omit<User, "id">>("users")
      .findOne({ _id: new ObjectId(id) });

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    const { _id, password, ...rest } = user;

    return { id: _id.toHexString(), ...rest };
  }
}
