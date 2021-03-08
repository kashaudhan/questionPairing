import React from "react";
import InputCard from "./components/InputCard";
import QuestionList from "./components/QuestionList";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    // width: "100%",
    marginTop: "7rem",
  },
}));

function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Navbar />
      <div className={classes.container}>
        <InputCard />
        <QuestionList />
      </div>
      <Footer />
    </div>
  );
}

export default App;
