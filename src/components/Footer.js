import React from "react";
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: "flex",
  },
  content: {
    justifyContent: "space-around",
    marginLeft: "25%",
    marginRight: "25%",
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <div>
      <AppBar position="static" color="primary" className={classes.root}>
        <Container>
          <Toolbar className={classes.content}>
            <Typography variant="body2">© 2021 kashaudhan</Typography>
            <Typography variant="body2">Stay in touch</Typography>
            <Typography variant="body2">Help & FAQs</Typography>
            <Typography variant="body2">Contact</Typography>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}
