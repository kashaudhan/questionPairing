import React, { useEffect, useCallback } from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  similarIntent: {
    height: "100%",
    width: "100%",
    marginTop: "0.2rem",
    borderRadius: "5px",
    background: "rgb(129, 129, 243)",
  },
  differentIntent: {
    height: "100%",
    width: "100%",
    marginTop: "0.2rem",
    borderRadius: "5px",
    background: "rgb(252, 150, 150)",
  },
}));

const ShowResult = ({ isSimilar, removeMsg }) => {
  const classes = useStyles();
  const show = useCallback(() => {
    const timeout = setTimeout(() => {
      removeMsg(false);
    }, 7000);
    return () => clearTimeout(timeout);
  }, [removeMsg]);

  useEffect(() => {
    show();
  }, [show]);

  return (
    <div>
      {isSimilar ? (
        <p className={classes.similarIntent}>Has similar intent</p>
      ) : (
        <p className={classes.differentIntent}>Has different intent</p>
      )}
    </div>
  );
};

export default ShowResult;
