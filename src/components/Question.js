import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";
import { Button } from "@material-ui/core";
import data from "../dummyData";

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: "1%",
  },
  formControl: {
    margin: theme.spacing(3),
    borderColor: "red",
  },
  label: {
    width: "100%",
    textAlign: "left",
    background: "rgb(222, 230, 240)",
    margin: "3px",
    borderRadius: "5px",
    padding: "2px",
    "&:hover": {
      background: "rgb(208, 229, 253)",
    },
  },
  submitButton: {
    marginTop: "1.5rem",
  },
}));

export default function CheckboxesGroup() {
  const classes = useStyles();
  const initialQuestions = { q1: "", q2: "" };
  const [questions, setQuestion] = useState(initialQuestions);

  const d = {};
  data.forEach((item) => (d[item.id] = false));
  const [state, setState] = useState(d);

  const handleChange = (e, item) => {
    setState({ ...state, [item.id]: e.target.checked });
  };

  const error = () => {
    let count = 0;
    for (const p in state) {
      if (state[p]) count += 1;
    }
    if (count !== 2) return true;
    return false;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newQuestions = initialQuestions;
    if (error()) {
      console.log("error");
      setQuestion(initialQuestions);
    } else {
      for (const p in state) {
        if (state[p]) {
          newQuestions.q1 = newQuestions.q2;
          newQuestions.q2 = data.filter((item) => item.id === p)[0].q;
          console.log("Questions: ", `${p} `, questions);
        }
      }
      setQuestion({ newQuestions });
      setQuestion(initialQuestions);
    }
  };

  return (
    <div className={classes.root}>
      <form onSubmit={handleSubmit}>
        <FormControl
          error={error()}
          component="fieldset"
          className={classes.formControl}
        >
          <FormLabel component="legend">Pick any two</FormLabel>
          <FormGroup>
            {data.map((item, i) => {
              return (
                <FormControlLabel
                  color="secondary"
                  key={i}
                  id={item.id}
                  className={classes.label}
                  control={
                    <Checkbox
                      onChange={(e) => handleChange(e, item)}
                      name={item.q}
                    />
                  }
                  label={item.q}
                />
              );
            })}
          </FormGroup>
          <FormHelperText>Select only two</FormHelperText>
          <Button
            variant="contained"
            color="primary"
            className={classes.submitButton}
            type="submit"
          >
            Predict
          </Button>
        </FormControl>
      </form>
    </div>
  );
}
