import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableContainer,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Fab
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import RemoveIcon from "@material-ui/icons/Remove";

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(4),
    margin: theme.spacing(1),
    width: "75%"
  },
  table: {},
  fabButton: {}
}));

function ItemsTable({ items, handleDelete }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="Items table">
          <TableBody>
            {items.map(item => {
              return (
                <TableRow key={item.key}>
                  <TableCell component="th" scope="row" width="75%">
                    {item}
                  </TableCell>
                  <TableCell align="right">
                    <Fab
                      color="primary"
                      aria-label="edit"
                      className={classes.fabButton}
                    >
                      <EditIcon />
                    </Fab>
                  </TableCell>
                  <TableCell align="right">
                    <Fab
                      color="secondary"
                      aria-label="remove"
                      className={classes.fabButton}
                      onClick={() => handleDelete(item.key)}
                    >
                      <RemoveIcon />
                    </Fab>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ItemsTable;
