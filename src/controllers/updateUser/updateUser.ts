import { User } from "../../models/user";
import { HttpRequest, HttpResponse } from "../protocols";
import {
  IUpdateUserController,
  IUpdateUserRepository,
  UpdateUserParams,
} from "./protocolUpdateUser";

export class UpdateUserController implements IUpdateUserController {
  constructor(private readonly updateUserRepository: IUpdateUserRepository) {}
  async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<User>> {
    try {
      const id = httpRequest?.params?.id;
      const body = httpRequest?.body;

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
