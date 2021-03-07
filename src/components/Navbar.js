import React from "react";
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  makeStyles,
  IconButton,
  CardMedia,
  Button,
} from "@material-ui/core";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import InfoIcon from "@material-ui/icons/Info";
import TwitterIcon from "@material-ui/icons/Twitter";
import logo from "../logo.svg";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: "block",
    position: "fixed",
    color: "primary",
  },
  title: {
    flexGrow: 1,
    marginLeft: theme.spacing(8),
    color: "black",
  },
  logo: {
    width: 45,
    height: 45,
    margin: theme.spacing(0.5),
  },
  item: {
    marginRight: theme.spacing(2),
  },
  itemEnd: {
    marginRight: theme.spacing(8),
  },
}));

export default function Navbar() {
  const classes = useStyles();
  const gotoGitProfile = (event) =>
    (window.location.href = "http://www.github.com/kashaudhan");

  const gotoLinkedInProfile = (event) =>
    (window.location.href = "http://www.linkedin.com/in/kashaudhan");

  const gotoInfo = (event) =>
    (window.location.href = "http://www.github.com/kashaudhan/questionPairing");

  return (
    <div>
      <AppBar className={classes.root}>
        <Container>
          <Toolbar>
            <IconButton>
              <CardMedia className={classes.logo} image={logo} />
            </IconButton>
            <Typography variant="h5" color="inherit" className={classes.title}>
              Pair Questions
            </Typography>
            <Typography variant="body2" className={classes.item}>
              <Button>Home</Button>
            </Typography>
            <Typography variant="body2" className={classes.item}>
              <Button>Git Repo</Button>
            </Typography>
            <Typography variant="body2" className={classes.item}>
              <Button>Projects</Button>
            </Typography>
            <Typography variant="body2" className={classes.itemEnd}>
              <Button>Contact</Button>
            </Typography>

            <IconButton>
              <GitHubIcon onClick={gotoGitProfile} />
            </IconButton>
            <IconButton>
              <LinkedInIcon onClick={gotoLinkedInProfile} />
            </IconButton>
            <IconButton>
              <TwitterIcon onClick={gotoInfo} />
            </IconButton>
            <IconButton>
              <InfoIcon onClick={gotoInfo} />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}
