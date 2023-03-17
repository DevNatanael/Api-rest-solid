import validator from "validator";

import { User } from "../../../models/user";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { CreateUserParams, ICreateUserRepository } from "./protocolCreateUser";

export class CreateUserController implements IController {
  constructor(private readonly createUserRepository: ICreateUserRepository) {}

  async handle(
    httpRequest: HttpRequest<CreateUserParams | any>
  ): Promise<HttpResponse<User>> {
    try {
      // verificar campos obrigatorios
      const requiredFields = ["firstName", "lastName", "email", "password"];

      for (const field of requiredFields) {
        if (!httpRequest?.body?.[field as keyof CreateUserParams].length) {
          return {
            statusCode: 400,
            body: `Campo ${field} não pode estar vazio`,
          };
        }
      }

      //verificar se email é valido
      const emailIsValid = validator.isEmail(httpRequest.body.email);

      if (!emailIsValid) {
        return {
          statusCode: 400,
          body: "email não é válido",
        };
      }

      const user = await this.createUserRepository.createUser(httpRequest.body);

      return {
        statusCode: 201,
        body: user,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: "Algo deu errado",
      };
    }
  }
}
