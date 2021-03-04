const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = 5000;
const MONGO_URI = "mongodb://localhost:27017/questions";

app.use(cors());
app.use(express.json());

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.once("open", () => {
  console.log("Database Connected!!!");
});

const questions = require("./questions");
app.use("/", questions);

app.listen(PORT, () => {
  console.log(`listening on port : ${PORT}`);
});
