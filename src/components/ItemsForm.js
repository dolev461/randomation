import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ItemsTable from "./ItemsTable";
import Item from "./Item";
import {
  makeStyles,
  createMuiTheme,
  MuiThemeProvider
} from "@material-ui/core/styles";
import { green, indigo } from "@material-ui/core/colors";
import {
  Fab,
  TextField,
  Button,
  Snackbar,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import AddIcon from "@material-ui/icons/Add";
import CheckIcon from "@material-ui/icons/Check";
import DeleteIcon from "@material-ui/icons/Delete";

const greenTheme = createMuiTheme({
  palette: {
    primary: {
      ...green,
      contrastText: "#fff"
    }
  }
});

const blueTheme = createMuiTheme({
  palette: {
    primary: indigo
  }
});

const useStyles = makeStyles(theme => ({
  root: {},
  add_item: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    width: "50%",
    margin: theme.spacing(1)
  },
  fabButton: {
    margin: theme.spacing(1)
  },
  successButton: {
    margin: theme.spacing(2)
  },
  float: {
    margin: 0,
    top: "auto",
    right: 20,
    bottom: 20,
    left: "auto",
    position: "fixed"
  }
}));

function ItemsForm({ items, setItems }) {
  const classes = useStyles();
  const history = useHistory();

  const [text, setText] = useState("");
  const [isAlert, setIsAlert] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [isDialog, setIsDialog] = useState(false);

  const Alert = props => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  };

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setIsAlert(false);
  };

  const handleDialogClose = () => {
    setIsDialog(false);
  };

  const handleAdd = () => {
    if (text === "") {
      setAlertText("Dirty thing to do. Fill the box!");
      setIsAlert(true);
      return;
    }

    setItems([...items, <Item text={text} key={items.length} />]);
    setText("");
  };

  const handleDelete = itemKey => {
    setItems(items.filter(item => item.key !== itemKey));
  };

  return (
    <div className={classes.root}>
      <div className={classes.add_item}>
        <TextField
          id="outlined-basic"
          label="Item"
          variant="outlined"
          className={classes.textField}
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyPress={ev => {
            if (ev.key === "Enter") {
              handleAdd();
            }
          }}
        />
        <Fab
          color="inherit"
          aria-label="add"
          className={classes.fabButton}
          onClick={handleAdd}
        >
          <AddIcon />
        </Fab>
      </div>
      <MuiThemeProvider theme={greenTheme}>
        <MuiThemeProvider theme={blueTheme}>
          <div>
            <ItemsTable items={items} handleDelete={handleDelete} />
          </div>
        </MuiThemeProvider>
        <div className={classes.float}>
          <Fab
            color="primary"
            aria-label="send"
            className={classes.successButton}
            onClick={() => {
              if (items.length === 0) {
                setAlertText("No can do! Please add items.");
                setIsAlert(true);
              } else {
                history.push("/random");
              }
            }}
          >
            <CheckIcon />
          </Fab>
          <Fab
            color="secondary"
            aria-label="clear"
            className={classes.fabButton}
            onClick={() => {
              if (items.length !== 0) {
                setIsDialog(true);
              }
            }}
          >
            <DeleteIcon />
          </Fab>
        </div>
        <Dialog
          open={isDialog}
          onClose={handleDialogClose}
          aria-label="dialog-remove-all"
        >
          <DialogTitle id="dialog-title">Remove Confirmation</DialogTitle>
          <DialogContent>
            <DialogContentText id="dialog-description">
              Are you sure you want to remove all of the items?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setItems([]);
                handleDialogClose();
              }}
              color="primary"
            >
              Agree
            </Button>
            <Button
              onClick={() => {
                handleDialogClose();
              }}
              color="secondary"
            >
              Disagree
            </Button>
          </DialogActions>
        </Dialog>
        <Snackbar
          open={isAlert}
          autoHideDuration={4000}
          onClose={handleAlertClose}
        >
          <Alert onClose={handleAlertClose} severity="warning">
            {alertText}
          </Alert>
        </Snackbar>
      </MuiThemeProvider>
    </div>
  );
}

export default ItemsForm;
