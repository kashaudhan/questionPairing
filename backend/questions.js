const router = require("express").Router();
let Questions = require("./dbSchema");
const { spawn } = require("child_process");

router.route("/").get((req, res) => {
  Questions.find()
    .then((questions) => {
      let len = questions.length - 1;
      let p1 = questions[len].question.toString();
      let p2 = questions[len - 1].question.toString();
      console.log(`Q1: ${p1}\nQ2: ${p2}`);
      const python = spawn("python", ["predict.py", p1, p2]);
      python.stdout.on("data", (data) => (res.locals.data = data.toString()));
      python.on("close", (code, signal) =>
        console.log(
          `child process closed with code ${code} and signal ${signal}`
        )
      );
      setTimeout(() => {
        console.log("python data: ", res.locals.data);
        const data = res.locals.data;
        res.json({ questions, data });
      }, 5000);
    })
    .catch((err) => res.status(400).json("Error: ", err));
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
