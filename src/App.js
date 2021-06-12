import React, { useState } from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import ItemsForm from "./components/ItemsForm";
import Randomizer from "./components/Randomizer";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  body: {
    margin: "30px",
  },
  fabButton: {
    margin: "0 auto",
  },
  link: {
    textDecoration: "none",
    color: "#fff",
  },
  credit: {
    color: "#ccc",
  }
}));

function App() {
  const classes = useStyles();
  const [items, setItems] = useState([]);

  return (
    <div className={classes.root}>
      <BrowserRouter>
        <div>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                <Link to="/" className={classes.link}>
                  Randomation
                </Link>
              </Typography>
              <Typography variant="h7" className={classes.credit}>
                By Dolev Z.
              </Typography>
            </Toolbar>
          </AppBar>
        </div>
        <div className={classes.body}>
          <Switch>
            <Route exact path="/">
              <ItemsForm items={items} setItems={setItems} />
            </Route>
            <Route path="/random">
              <Randomizer items={items} />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
