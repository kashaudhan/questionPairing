import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../context";
import { makeStyles, TextField, Button } from "@material-ui/core";
import axios from "axios";
import ShowResult from "./ShowResult";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    padding: "2rem",
  },
  textField: {
    marginTop: "1rem",
  },
  input: {
    background: "white",
    minHeight: "3rem",
  },
  button: {
    marginTop: "1.5rem",
    marginLeft: "45%",
  },
  inputLabel: {
    color: "black",
  },
  helperText: {
    margin: "0",
    fontSize: "10px",
  },
}));

const InputField = () => {
  const { inputQuestions, setInputQuestions } = useGlobalContext();
  const classes = useStyles();
  const [hasPredicted, setHasPredicted] = useState(false);
  const [predVal, setPredVal] = useState(0.0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputQuestions);

    await axios.post("http://localhost:5000", { question: inputQuestions.q1 });
    await axios.post("http://localhost:5000", { question: inputQuestions.q2 });

    await axios.get("http://localhost:5000").then((res) => {
      const temp = res.data.data;
      const val = parseFloat(temp.substring(1, temp.length - 1));
      setPredVal(val);
      setHasPredicted(true);
      console.log("data: ", val);
    });
  };

  const handleChange = (prop) => (e) => {
    setInputQuestions({ ...inputQuestions, [prop]: e.target.value });
  };

  return (
    <div className="input__container">
      <div className="result__block">
        {hasPredicted && (
          <ShowResult
            removeMsg={setHasPredicted}
            val={predVal > 0.4 ? true : false}
            list={inputQuestions}
          ></ShowResult>
        )}
      </div>
      <form className={classes.root} autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="dense"
          id="outlined-textarea"
          label="Question 1"
          multiline
          variant="outlined"
          required
          InputProps={{ className: classes.input }}
          InputLabelProps={{ className: classes.inputLabel }}
          className={classes.inputLabel}
          inputProps={{ maxLength: 500 }}
          helperText={`${inputQuestions.q1.length}/${500}`}
          onChange={handleChange("q1")}
          FormHelperTextProps={{ className: classes.helperText }}
        />
        <TextField
          fullWidth
          margin="dense"
          id="outlined-textarea"
          label="Question 2"
          multiline
          variant="outlined"
          required
          InputProps={{ className: classes.input }}
          InputLabelProps={{ className: classes.inputLabel }}
          className={classes.inputLabel}
          inputProps={{ maxLength: 500 }}
          helperText={`${inputQuestions.q2.length}/${500}`}
          onChange={handleChange("q2")}
          FormHelperTextProps={{ className: classes.helperText }}
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          type="submit"
        >
          Predict
        </Button>
      </form>
    </div>
  );
};

export default InputField;
