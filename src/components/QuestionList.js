import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Question from "./Question";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "80%",
    marginLeft: "5",
    marginTop: "2rem",
    position: "relative",
    "& > *": {
      marginLeft: "15%",
      marginTop: "50px",
      width: "80%",
      height: "100%",
      background: "rgb(245, 246, 247)",
    },
  },
}));

const dummyData = [
  { q: "This is the first question in the list" },
  { q: "This is the second question in the list" },
  { q: "This is the third question in the list" },
  { q: "This is the fourth question in the list" },
  { q: "This is the fifth question in the list" },
  { q: "This is the sixth question in the list" },
];

const QuestionList = () => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.root}>
        <Paper className="paper" elevation={5}>
          <Question />
        </Paper>
      </div>
    </>
  );
};
export default QuestionList;
