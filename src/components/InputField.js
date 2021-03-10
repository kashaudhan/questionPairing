import React, { useState } from "react";
import axios from "axios";
import { useGlobalContext } from "../context";
import ShowResult from "./ShowResult";
import { makeStyles, TextField, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {},
  formContainer: {
    display: "flex",
    flexWrap: "wrap",
    padding: "1rem 2rem 1rem 2rem",
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
  result: {
    height: "2rem",
    width: "20%",
    marginLeft: "40%",
    marginBottom: ".5rem",
    borderRadius: "5px",
  },
}));

const InputField = () => {
  const classes = useStyles();
  const { setHasClicked, setLoading } = useGlobalContext();
  const [predVal, setPredVal] = useState(0.0);
  const [hasPredicted, setHasPredicted] = useState(false);
  const [inputQuestions, setInputQuestions] = useState({ q1: "", q2: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(inputQuestions);

    axios.post("http://localhost:5000", { question: inputQuestions.q1 });
    axios.post("http://localhost:5000", { question: inputQuestions.q2 });
    const resp = await axios.post(
      "http://localhost:5000/predict",
      inputQuestions
    );
    const val = parseFloat(resp.data);
    console.log("predicted val: ", val);
    setPredVal(val);
    setHasPredicted(true);
    setHasClicked(true);
  };

  const handleChange = (prop) => (e) => {
    setInputQuestions({ ...inputQuestions, [prop]: e.target.value });
  };

  return (
    <div>
      <form
        className={classes.formContainer}
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <div className={classes.result}>
          {hasPredicted && (
            <ShowResult
              removeMsg={setHasPredicted}
              isSimilar={predVal > 0.3 ? true : false}
              list={inputQuestions}
            ></ShowResult>
          )}
        </div>
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
