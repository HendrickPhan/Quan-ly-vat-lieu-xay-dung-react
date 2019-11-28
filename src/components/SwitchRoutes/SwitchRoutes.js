import React from "react";
// @material-ui/core components
// react-redux components
import { connect } from 'react-redux';
// react-router-doom components
import { Router, Route, Switch, Redirect } from "react-router-dom";
// core components
import Admin from "layouts/Admin.js";
import Login from "views/Login/Login.js"


class SwitchRoutes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo:props.userInfo,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      userInfo:nextProps.userInfo,
    });
  }
  render() {
    if (!this.state.userInfo || this.state.userInfo==='undefined') {
      return (
        <Switch>
          <Route path="/login" component={Login} />
          <Redirect push to="/login"/>
        </Switch>
      )  
    } else {
      return (
        <Switch>
          <Route path="/login" component={Login} />
          <Route {...this.props} path="/admin" component={Admin}/>
          <Redirect from="/" to="/admin/dashboard" />
        </Switch>
      )
    }
  }
}

const mapState = state => ({
  userInfo: state.login.userInfo,
});

const mapDispatchToProps = (dispatch) => {
  return {
  };
}

export default connect(mapState, mapDispatchToProps)(SwitchRoutes);
