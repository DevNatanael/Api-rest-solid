import express, { Application } from "express";
import { config } from "dotenv";
import { MongoClient } from "./database/mongo";

config();
class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.middlewares();
  }

  middlewares() {
    this.app.use(express.json());
  }

  // routes(){

  // }

  public async connectDB(): Promise<void> {
    await MongoClient.connect();
  }
}

const app = new App();
app.connectDB();

export default app.app;
