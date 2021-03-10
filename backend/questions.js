const router = require("express").Router();
let Questions = require("./dbSchema");
const { spawn } = require("child_process");

router.route("/").get((req, res) => {
  Questions.find()
    .then((questions) => {
      res.json(questions);
    })
    .catch((err) => res.status(400).json("Error: ", err));
});

router.route("/predict").post((req, res) => {
  const p1 = req.body.q1;
  const p2 = req.body.q2;
  let predictionVal = "0";
  const python = spawn("python", ["predict.py", p1, p2]);
  python.stdout.on("data", (data) => {
    console.log("python data: ", data.toString());
    predictionVal = data.toString();
  });
  python.on("close", (code, signal) =>
    console.log(`process closed: code ${code} and signal ${signal}`)
  );
  setTimeout(() => {
    console.log("predictionVal: ", predictionVal);
    res.json(predictionVal.substr(1, 10));
  }, 7000);
});

router.route("/").post((req, res) => {
  const question = req.body.question;
  const newQuestion = new Questions({ question });
  newQuestion
    .save()
    .then(() => {
      res.json(`Question added!!!`);
    })
    .catch((err) => console.log(err));
});

module.exports = router;
