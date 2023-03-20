import { HttpRequest, HttpResponse, IController } from "../../Users/protocols";
import { CreateTokenParams, ICreateToken } from "./protocols";

export class TokenController implements IController {
  constructor(private readonly createToken: ICreateToken) {}

  async handle(
    httpRequest: HttpRequest<CreateTokenParams | any>
  ): Promise<HttpResponse<unknown>> {
    try {
      const data = await this.createToken.create(httpRequest.body);

      return {
        statusCode: 200,
        body: data,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: "Algo deu errado...",
      };
    }
  }
}
