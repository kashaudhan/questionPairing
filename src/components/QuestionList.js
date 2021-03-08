import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Question from "./Question";
import { useGlobalContext } from "../context";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "80%",
    marginLeft: "5",
    marginTop: "2rem",
    marginBottom: "2rem",
    position: "relative",
    "& > *": {
      marginLeft: "12%",
      marginTop: "50px",
      width: "100%",
      height: "100%",
      background: "rgb(245, 246, 247)",
    },
  },
}));

const QuestionList = () => {
  const classes = useStyles();
  const { loading, setLoading, questionList } = useGlobalContext();

  useEffect(() => {
    if (questionList.length > 0) {
      setLoading(false);
    }
  }, [questionList, setLoading]);

  if (loading) {
    return <div className="loader"></div>;
  }

  return (
    <>
      <div className={classes.root}>
        <Paper className="paper" elevation={10}>
          <Question />
        </Paper>
      </div>
    </>
  );
};
export default QuestionList;
