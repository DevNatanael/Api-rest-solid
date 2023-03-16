import { IGetUsersRepository } from "../../controllers/getUsers/protocolsGetUsers";
import { User } from "../../models/user";

export class MongoGetUsersRepository implements IGetUsersRepository {
  async getUsers(): Promise<User[]> {
    return [
      {
        firstName: "pedro",
        lastName: "coelho",
        email: "teste@gmail.com",
        password: "123",
      },
    ];
  }
}
