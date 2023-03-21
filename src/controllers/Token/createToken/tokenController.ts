/* eslint-disable @typescript-eslint/no-explicit-any */
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { HttpRequest, HttpResponse, IController } from "../../Users/protocols";
import { CreateTokenParams, ICreateToken } from "./protocols";

export class TokenController implements IController {
  constructor(private readonly createToken: ICreateToken) {}

  async handle(
    httpRequest: HttpRequest<CreateTokenParams | any>
  ): Promise<HttpResponse<unknown>> {
    try {
      const { email, password } = httpRequest.body;

      if (!email || !password) {
        return {
          statusCode: 401,
          body: "Credenciais inválidas!",
        };
      }

      const user = await this.createToken.create(httpRequest.body);
      const isValidPassword = await bcrypt.compare(password, user.password);

      if (user === null) {
        return {
          statusCode: 401,
          body: "Usuário não existe!",
        };
      }

      if (!isValidPassword) {
        return {
          statusCode: 401,
          body: "Senha inválida!",
        };
      }

      const { _id } = user;
      const secret: any = process.env.TOKEN_SECRET;

      const token = jwt.sign({ _id, email }, secret, {
        expiresIn: process.env.TOKEN_EXPIRATION,
      });

      return {
        statusCode: 200,
        body: { token },
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: "Erro!, Verifique suas credenciais e sua conexão!",
      };
    }
  }
}
