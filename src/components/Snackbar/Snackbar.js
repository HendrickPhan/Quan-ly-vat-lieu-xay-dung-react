import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Snack from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
// @material-ui/icons
import Close from "@material-ui/icons/Close";
// core components
import styles from "assets/jss/material-dashboard-react/components/snackbarContentStyle.js";
import { openSnack, closeSnack } from './SnackbarActions';

import { connect } from 'react-redux';

const useStyles = makeStyles(styles);

function SnackbarView(props) {
  const classes = useStyles();
  const { message, color, close, icon, place, open } = props;
  var action = [];
  const messageClasses = classNames({
    [classes.iconMessage]: icon !== undefined
  });
  if (close !== undefined) {
    action = [
      <IconButton
        className={classes.iconButton}
        key="close"
        aria-label="Close"
        color="inherit"
        onClick={() => props.closeNotification()}
      >
        <Close className={classes.close} />
      </IconButton>
    ];
  }
  return (
    <Snack
      anchorOrigin={{
        vertical: place.indexOf("t") === -1 ? "bottom" : "top",
        horizontal:
          place.indexOf("l") !== -1
            ? "left"
            : place.indexOf("c") !== -1
            ? "center"
            : "right"
      }}
      open={open}
      message={
        <div>
          {icon !== undefined ? <props.icon className={classes.icon} /> : null}
          <span className={messageClasses}>{message}</span>
        </div>
      }
      action={action}
      ContentProps={{
        classes: {
          root: classes.root + " " + classes[color],
          message: classes.message,
        }
      }}
    />
  );
}

SnackbarView.propTypes = {
  message: PropTypes.node.isRequired,
  color: PropTypes.oneOf(["info", "success", "warning", "danger", "primary"]),
  close: PropTypes.bool,
  icon: PropTypes.object,
  place: PropTypes.oneOf(["tl", "tr", "tc", "br", "bl", "bc"]),
  open: PropTypes.bool,
  closeNotification: PropTypes.func
};


class Snackbar extends React.Component {
  constructor(props) {
    super(props);

    // reset login status
    // this.props.logout();

    this.state = {
      message: props.message,
      color: props.color,
      close: props.close,
      icon: props.icon,
      place: props.place,
      open: props.open,
      closeNotification: props.closeNotification
    };


  }

  componentDidMount() {
    console.log("MOUNTED");
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      message: nextProps.message,
      color: nextProps.color,
      close: nextProps.close,
      icon: nextProps.icon,
      place: nextProps.place,
      open: nextProps.open,
      closeNotification: nextProps.closeNotification
    });
  }

  render() {
    return (
      <SnackbarView
      message={this.state.message}
      color={this.state.color}
      close={this.state.close}
      icon={this.state.icon}
      place={this.state.place}
      open={this.state.open}
      closeNotification={this.state.closeNotification}
      />
    )
  }
}


const mapState = state => ({
  message: state.snackbar.message,
  color: state.snackbar.color,
  close: state.snackbar.close,
  icon: state.snackbar.icon,
  place: state.snackbar.place,
  open: state.snackbar.open,
  closeNotification: state.snackbar.closeNotification
});

const mapDispatchToProps = (dispatch) => {
  return {
    openSnack: () => dispatch(openSnack()),
    closeSnack: () => dispatch(closeSnack()),
  };
}

export default connect(mapState, mapDispatchToProps)(Snackbar);
