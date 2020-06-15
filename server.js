const mongoose = require("mongoose");
const dotenv = require("dotenv");

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT REJECTION! Shutting down..........");
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: "./config.env" });

const app = require("./app");

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB successfully Connected"));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log("Server started listening!");
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDELER REJECTION! Shutting down..........");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
