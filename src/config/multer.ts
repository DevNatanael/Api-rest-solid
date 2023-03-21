import multer from "multer";
import { extname, resolve } from "path";
import { Request, Express } from "express";

const random = () => Math.floor(Math.random() * 10000 + 10000);

export default {
  fileFilter: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, destination: string | boolean) => void
  ) => {
    if (file.mimetype != "image/png" && file.mimetype != "image/jpeg") {
      return cb(new multer.MulterError("Arquivo precisa ser PNG ou JPG"));
    }

    return cb(null, true);
  },
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, resolve(__dirname, "..", "..", "uploads", "images"));
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}_${random()}${extname(file.originalname)}`);
    },
  }),
};
