/* eslint-disable @typescript-eslint/no-unused-vars */
import { ObjectId } from "mongodb";
import {
  IUpdateUserRepository,
  UpdateUserParams,
} from "../../../controllers/Users/updateUser/protocolUpdateUser";
import { MongoClient } from "../../../database/mongo";
import { User } from "../../../models/user";

export class MongoUpdateUserRepository implements IUpdateUserRepository {
  async updateUser(id: string, params: UpdateUserParams): Promise<User> {
    await MongoClient.db.collection("users").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...params,
        },
      }
    );

    const user = await MongoClient.db
      .collection<Omit<User, "id">>("users")
      .findOne({ _id: new ObjectId(id) });

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    const { _id, password,...rest } = user;

    return { id: _id.toHexString(), ...rest };
  }
}
