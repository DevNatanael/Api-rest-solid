/* eslint-disable @typescript-eslint/no-unused-vars */
import { ObjectId } from "mongodb";
import { IDeleteUserRepository } from "../../../controllers/Users/deleteUser/protocolDeleteUser";
import { MongoClient } from "../../../database/mongo";
import { User } from "../../../models/user";

export class MongoDeleteUserRepository implements IDeleteUserRepository {
  async deleteUser(id: string): Promise<User> {
    const user = await MongoClient.db
      .collection<Omit<User, "id">>("users")
      .findOne({ _id: new ObjectId(id) });

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    const { deletedCount } = await MongoClient.db
      .collection("users")
      .deleteOne({ _id: new ObjectId(id) });

    if (!deletedCount) {
      throw new Error("Usuário não deletado");
    }

    const { _id, password,...rest } = user;

    return { id: _id.toHexString(), ...rest };
  }
}
