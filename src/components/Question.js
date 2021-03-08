import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";
import { Button } from "@material-ui/core";
import { useGlobalContext } from "../context";
import axios from "axios";
import ShowResult from "./ShowResult";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    padding: ".5rem .5rem .1rem .5rem",
  },
  formControl: {
    margin: theme.spacing(3),
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
      boxShadow: "2px 3px #aaaaac",
    },
  },
  submitButton: {
    marginTop: "1.5rem",
  },
  result: {
    height: "2rem",
    width: "20%",
    marginLeft: "40%",
  },
}));

export default function CheckboxesGroup() {
  const classes = useStyles();
  const initialQuestions = { q1: "", q2: "" };
  const [questions, setQuestion] = useState(initialQuestions);
  const {
    hasClicked,
    setHasClicked,
    questionList,
    setQuestionList,
  } = useGlobalContext();
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState({});
  const [hasSelected, setHasSelected] = useState(false);
  const [predVal, setPredVal] = useState(0.0);

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
      console.log("state: ", state);
      setQuestion(initialQuestions);
    } else {
      for (const p in state) {
        if (state[p]) {
          newQuestions.q1 = newQuestions.q2;
          newQuestions.q2 = questionList.filter(
            (item) => item.id === p
          )[0].question;
          console.log("Questions: ", `${p} `, questions);
        }
      }
      console.log("state: ", state);
      setQuestion(newQuestions);
      setHasSelected(true);
    }
  };

  useEffect(() => {
    if (hasSelected) {
      axios
        .get("http://localhost:5000")
        .then((respData) => {
          return respData.data.data;
        })
        .then((data) => {
          const val = parseFloat(data.substring(1, data.length - 1));
          setPredVal(val);
        });
    }
  }, [hasSelected]);

  useEffect(() => {
    if (hasClicked) {
      axios
        .get("http://localhost:5000")
        .then((respData) => {
          return respData.data.questions.map((item) => {
            return { id: item._id, question: item.question };
          });
        })
        .then((list) => {
          console.log("lit ", list);
          setQuestionList(list);
          setHasClicked(false);
        });
    }
  }, [hasClicked, setQuestionList, setHasClicked]);

  useEffect(() => {
    if (questionList.length > 0) {
      const d = {};
      questionList.reverse();
      questionList.forEach((item) => (d[item.id] = false));
      setLoading(false);
    }
  }, [questionList]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className={classes.root}>
      <div className={classes.result}>
        {hasSelected && (
          <ShowResult
            removeMsg={setHasSelected}
            val={predVal > 0.3 ? true : false}
          ></ShowResult>
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <FormControl
          error={error()}
          component="fieldset"
          className={classes.formControl}
        >
          <FormLabel component="legend">Pick any two</FormLabel>
          <FormGroup>
            {questionList.map((item, i) => {
              return (
                <FormControlLabel
                  color="secondary"
                  key={i}
                  id={item.id}
                  className={classes.label}
                  control={
                    <Checkbox
                      onChange={(e) => handleChange(e, item)}
                      name={item.question}
                    />
                  }
                  label={item.question}
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
