import express, { Application } from "express";
import { config } from "dotenv";
import { MongoClient } from "./database/mongo";
import usersRoutes from "./routes/usersRoutes";
import loginRoutes from './routes/loginRoutes'
import imageRoutes from './routes/imageRoutes'

config();
class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.json());
  }

  routes() {
    this.app.use("/users", usersRoutes);
    this.app.use("/login", loginRoutes);
    this.app.use("/image", imageRoutes);
  }

  public async connectDB(): Promise<void> {
    await MongoClient.connect();
  }
}

const app = new App();
app.connectDB();

export default app.app;

