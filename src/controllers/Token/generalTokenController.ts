import { MongoCreateToken } from "../../repositories/Token/mongo-create-token";
import { TokenController } from "./createToken/tokenController";
import { Request, Response } from "express";

class GeneralTokenController {
  async createToken(req: Request, res: Response) {
    const getTokenRepository = new MongoCreateToken();
    const getTokenController = new TokenController(getTokenRepository);

    const { body, statusCode } = await getTokenController.handle({
      body: req.body,
    });

    res.status(statusCode).send(body);
  }
}

export default new GeneralTokenController();
