import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grow, LinearProgress } from "@material-ui/core";
import soundFile from "../static/bloop.mp3";

const useStyles = makeStyles(theme => ({
  root: {
    display: "block",
    textAlign: "center",
    justifyContent: "center"
  },
  title: {},
  barDiv: {
    display: "flex",
    justifyContent: "center"
  },
  bar: {
    width: "75%",
    marginTop: theme.spacing(5)
  }
}));

function Randomizer({ items }) {
  const classes = useStyles();
  const [checked, setChecked] = useState(true);
  const [timeoutMs, setTimeoutMs] = useState(100);
  const [count, setCount] = useState(0);
  const timeoutMsInc = 10;
  const slowCount = 35;
  const maxCount = 50;
  const audio = new Audio(soundFile);

  const handleEntered = () => {
    if (count >= maxCount) {
      return;
    }

    audio.play();

    setChecked(prev => !prev);
  };

  const handleExited = () => {
    if (count >= slowCount) {
      setTimeoutMs(timeoutMs + timeoutMsInc);
    }

    setItem(getRandomItem());

    setChecked(prev => !prev);
    setCount(count + 1);
  };

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

  const [item, setItem] = useState(getRandomItem());

  return (
    <div className={classes.root}>
      <div>
        <Grow
          in={checked}
          onEntered={handleEntered}
          onExited={handleExited}
          timeout={timeoutMs}
        >
          <Typography variant="h1" className={classes.title}>
            {item}
          </Typography>
        </Grow>
      </div>
      <div className={classes.barDiv}>
        <LinearProgress
          variant="determinate"
          value={(count / maxCount) * 100}
          className={classes.bar}
        />
      </div>
    </div>
  );
}

export default Randomizer;
