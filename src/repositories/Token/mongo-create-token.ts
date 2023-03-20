import {
  CreateTokenParams,
  ICreateToken,
} from "../../controllers/Token/createToken/protocols";
import { MongoClient } from "../../database/mongo";

export class MongoCreateToken implements ICreateToken {
  async create(params: CreateTokenParams): Promise<any> {
    const user = await MongoClient.db
      .collection("users")
      .findOne({ email: params?.email });

    if (!user) {
      throw new Error("Usuário não foi criado");
    }

    return user;
  }
}
