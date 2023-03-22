/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import multer from "multer";
import multerConfig from "../../config/multer";
import { Request, Response } from "express";
import { MongoCreateImage } from "../../repositories/Images/mongo-create-image";

const upload = multer(multerConfig).single("image");

class ImageController {
  async create(req: Request, res: Response) {
    return upload(req, res, async (err) => {
      if (err) {
        return res.status(400).send(err.code);
      }

      try {
        const getImageRepository = new MongoCreateImage();
        const data: any = req.file;
        const image = await getImageRepository.create(data);

        const { _id, ...rest } = image;

        console.log(rest);
        res.status(200).json({
          msg: "Imagem enviada com sucesso!",
          data: rest,
        });
      } catch (error) {
        return res.status(400).send("Algo deu errad...");
      }
    });
  }
}

export default new ImageController();
