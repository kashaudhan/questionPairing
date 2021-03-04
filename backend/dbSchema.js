const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionsSchema = Schema(
  { question: { type: String, required: true } },
  { timestamps: true }
);

const Questions = mongoose.model("Questions", questionsSchema);

module.exports = Questions;
