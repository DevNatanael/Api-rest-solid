/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  CreateImageParams,
  ICreateImage,
} from "../../controllers/Images/protocols";
import { MongoClient } from "../../database/mongo";
import { Image } from "../../models/image";

export class MongoCreateImage implements ICreateImage {
  async create(params: CreateImageParams): Promise<any> {
    const { filename, originalname } = params;
    const { insertedId } = await MongoClient.db
      .collection("images")
      .insertOne({ filename, originalname });


      const image = await MongoClient.db
      .collection<Omit<Image, "id">>("images")
      .findOne({ _id: insertedId });

      return image;
  }
}
