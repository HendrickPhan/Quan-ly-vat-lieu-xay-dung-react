import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

// core components
import styles from "assets/jss/material-dashboard-react/components/tableStyle.js";

const useStyles = makeStyles(styles);

export default function TableCellAction(props) {
  const classes = useStyles();
  const { onClickEditHandle, onClickDeleteHandle, id } = props;
  return (
    <div className={classes.cellAction}>
      <IconButton size="medium" color="primary" aria-label="add" className={classes.margin} id={id} onClick={() => onClickEditHandle(id)}>
        <EditIcon />
      </IconButton>
      <IconButton size="medium" color="secondary" aria-label="add" className={classes.margin} id={id} onClick={() => onClickDeleteHandle(id)}>
        <DeleteIcon />
      </IconButton>
    </div>
  );
}

TableCellAction.propTypes = {
  id: PropTypes.number,
  onClickEditHandle: PropTypes.func,
  onClickDeleteHandle: PropTypes.func,
};
