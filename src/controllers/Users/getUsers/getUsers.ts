import { IController } from "../protocols";
import { IGetUsersRepository } from "./protocolGetUsers";

export class GetUsersController implements IController {
  constructor(private readonly getUsersRepository: IGetUsersRepository) {}

  async handle() {
    try {
      //validar requisição
      //direcionar chamada para repository
      const users = await this.getUsersRepository.getUsers();

      return {
        statusCode: 200,
        body: users,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: "algo deu errado",
      };
    }
  }
}
