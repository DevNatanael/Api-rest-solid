import app from "./app";

const port = process.env.PORT;

app.listen(port, () =>
console.table({
  Server: "Server is running 🚀",
  Port: port,
  DataBase: process.env.MONGODB_URL,
})
);
