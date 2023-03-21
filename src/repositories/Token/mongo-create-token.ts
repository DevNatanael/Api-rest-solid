/* eslint-disable @typescript-eslint/no-explicit-any */
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
    return user;
  }
}
