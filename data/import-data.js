const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const amazonProductModel = require("./../models/amazonProductModel");

dotenv.config({ path: "./config.env" });

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

// READ JSON FILE
const kurthiesData = JSON.parse(
  fs.readFileSync(`${__dirname}/Kurthis.json`, "utf-8")
);
const jeanTopsData = fs.readFileSync(`${__dirname}/jeans-top.json`, "utf-8");

const importData = async () => {
  try {
    await amazonProductModel.create(kurthiesData);
  } catch (err) {
    console.log(err);
  }
};
