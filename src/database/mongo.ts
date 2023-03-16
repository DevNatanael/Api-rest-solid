import { MongoClient as Mongo, Db } from "mongodb";

export const MongoClient = {
  client: undefined as unknown as Mongo,
  db: undefined as unknown as Db,

  async connect(): Promise<void> {
    const url = process.env.MONGODB_URL || "localhost:27017";
    //const username = ''
    //const password = ''

    const client = new Mongo(url);
    //const client = new Mongo(url, {auth:{username, password}});
    const db = client.db("db-portaria");

    this.client = client;
    this.db = db;

    console.log('conectado ao mongodb')
  },
};
