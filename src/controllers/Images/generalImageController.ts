import { Request, Response } from "express";
import { MongoCreateImage } from "../../repositories/Images/mongo-create-image";
import { ImageController } from "./createImage/imageController";

class GeneralImageController {
  async createImage(req: Request, res: Response) {
    const getImageRepository = new MongoCreateImage();
    const getImageController = new ImageController(getImageRepository);

    const { body, statusCode } = await getImageController.handle({
      body: req.body,
    });

    res.status(statusCode).send(body);
  }
}

export default new GeneralImageController();
