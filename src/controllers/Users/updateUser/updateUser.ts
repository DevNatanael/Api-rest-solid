import { User } from "../../../models/user";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { IUpdateUserRepository, UpdateUserParams } from "./protocolUpdateUser";
export class UpdateUserController implements IController {
  constructor(private readonly updateUserRepository: IUpdateUserRepository) {}
  async handle(
    httpRequest: HttpRequest<UpdateUserParams>
  ): Promise<HttpResponse<User>> {
    try {
      const id = httpRequest?.params?.id;
      const body = httpRequest?.body;

      if (!body) {
        return {
          statusCode: 400,
          body: "Campos faltam serem preenchidos",
        };
      }

      if (!id) {
        return {
          statusCode: 400,
          body: "Informe o Id",
        };
      }
      const allowedFields: (keyof UpdateUserParams)[] = [
        "firstName",
        "lastName",
        "password",
      ];
      const fildNotAllowed = Object.keys(body).some(
        (key) => !allowedFields.includes(key as keyof UpdateUserParams)
      );

      if (fildNotAllowed) {
        return {
          statusCode: 400,
          body: "Campo informado não pode ser alterado",
        };
      }

      const user = await this.updateUserRepository.updateUser(id, body);

      return {
        statusCode: 200,
        body: user,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: "Algo deu errado!",
      };
    }
  }
}
