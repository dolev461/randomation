import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "center"
  }
}));

function Randomizer({ items }) {
  const classes = useStyles();

  const generateNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const getRandomItem = () => {
    if (items.length === 0) {
      return "<empty>";
    }

    const chosen = generateNumber(0, items.length - 1);
    const { text } = items[chosen].props;

    return text;
  };

  return <div className={classes.root}>{getRandomItem()}</div>;
}

export default Randomizer;
