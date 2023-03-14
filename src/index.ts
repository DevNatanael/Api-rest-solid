import express from "express";
import { config } from "dotenv";

config();
const app = express();

const port = process.env.PORT;

app.listen(port, () => console.log(`Servidor iniciado na porta ${port}`));

app.get("/", (req, res) => {
  res.send("ola mundo");
});
