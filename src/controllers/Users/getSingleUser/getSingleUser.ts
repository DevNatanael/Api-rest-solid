/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from "../../../models/user";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { IGetSingleUserRepository } from "./getSingleUserProtocol";

export class GetSingleUserController implements IController {
  constructor(
    private readonly getSingleUserRepository: IGetSingleUserRepository
  ) {}

  async handle(httpRequest: HttpRequest<unknown>): Promise<HttpResponse<User>> {
    try {
      const id = httpRequest?.params?.id;

      if (!id) {
        return {
          statusCode: 401,
          body: "Id não informado",
        };
      }

      const user = await this.getSingleUserRepository.getSingleUser(id);

      return {
        statusCode: 200,
        body: user,
      };
    } catch (error: any) {
      return {
        statusCode: 500,
        body: error.message,
      };
    }
  }
}
