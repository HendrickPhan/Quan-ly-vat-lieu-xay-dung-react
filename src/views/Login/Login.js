import React from "react";
// @material-ui/core components
// react-redux components
import { connect } from 'react-redux';
import { loginUser } from './LoginActions';
// react-router-doom components
import { withRouter } from "react-router-dom";
// core components
import LoginView from "./LoginView.jsx"

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      fetched:props.fetched,
      fetching:props.fetching,
      userInfo:props.userInfo,
      loggedIn: props.loggedIn
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      fetched: nextProps.fetched,
      fetching: nextProps.fetching,
      userInfo: nextProps.userInfo,
      loggedIn: nextProps.loggedIn,
    }, ()=> {
      console.log("STATE", this.state)
      if(this.state.loggedIn){
        const { history } = this.props;
        history.push(`/admin/dashboard`);
      }
    });
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
        [name]: value
    }, ()=>{
      console.log(this.state)
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let { email, password } = this.state;
    if (email && password) {
      this.props.loginUser(email, password);
    }
  }

  render() {
    console.log(this.state)
    
    return (
      <LoginView
        handleChange={(e) => this.handleChange(e)}
        handleSubmit={(e) => this.handleSubmit(e)}
      />
     
    );
  }
}

const mapState = state => ({
  fetching: state.login.fetching,
  fetched: state.login.fetched,
  userInfo: state.login.userInfo,
  loggedIn: state.login.loggedIn
});

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (email, password) => dispatch(loginUser(email, password)),
  };
}

export default connect(mapState, mapDispatchToProps)(Login);  //login -> xuat ra component login
