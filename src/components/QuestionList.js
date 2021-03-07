import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Question from "./Question";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "80%",
    marginLeft: "5",
    marginTop: "2rem",
    marginBottom: "2rem",
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
