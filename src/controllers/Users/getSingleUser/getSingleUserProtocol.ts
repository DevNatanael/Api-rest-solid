import { User } from "../../../models/user";

export interface IGetSingleUserRepository {
    getSingleUser(id: string): Promise<User>;
  }
