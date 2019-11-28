import React from "react";
// react-redux components
import { connect } from 'react-redux';
import { fetchUser, editUser, addUser, reset } from './UserFormActions';
// react-router-doom components
import { generatePath } from "react-router";

// core components
import UserFormView from "./UserFromView.jsx";


class UserForm extends React.Component {

  constructor(props) {
    super(props);

    // reset login status
    // this.props.logout();

    this.state = {
      user: {
        id: null,
        name: '',
        address: '',
        phone: '',
        email: '',
        in_debt_amount: 0
      },
    };
  }


  handleChange(e) {
    const { name, value } = e.target;
    this.setState(prevState => ({
      user: {
        ...prevState.user,
        [name]: value
      }
    }));

  }

  handleSubmit(e) {
    e.preventDefault();
    let data = (({ name, address, phone }) => ({ name, address, phone }))(this.state.user);
    
    if(this.state.user.id){
      this.props.editUser(this.state.user.id, data);
    } 
    else {
      const { history } = this.props;
      this.props.addUser(data).then( user => {
        history.push({
          pathname: generatePath(this.props.match.path, {id: user.id})
        });
        this.props.fetchUser(user.id);

      }); 
    } 
  }


  componentDidMount() {
    if (this.props.match.params.id != 'add') {
      this.props.fetchUser(this.props.match.params.id);
    }
    else{
      this.props.reset();
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      fetching: nextProps.fetching,
      fetched: nextProps.fetched,
      user: nextProps.user,
      fetchUser: (id) => nextProps.fetchUser(id),
      editUser: (id, data) => nextProps.editUser(id, data),
      addUser: (data) => nextProps.addUser(data),
      reset: () =>  nextProps.reset(),
      error: nextProps.error
    });
  }

  render() {
    if (this.props.error) {
      alert(this.props.error);
    }
    const tableOption = {
      actionsColumnIndex: 100,
      headerStyle: {
        textAlign: 'left'
      },
      actionsCellStyle: {
        width: 'fit-content'
      }
    }

    return (
      <UserFormView
        fetched={this.state.fetched}
        user={this.state.user}
        handleChange={(e) => this.handleChange(e)}
        handleSubmit={(e) => this.handleSubmit(e)}
      />
    );
  }
}


const mapState = state => ({
  fetching: state.userForm.fetching,
  fetched: state.userForm.fetched,
  user: state.userForm.user,
  error: state.userForm.error
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: (id) => dispatch(fetchUser(id)),
    editUser: (id, data) => dispatch(editUser(id, data)),
    addUser: (data) => dispatch(addUser(data)),
    reset: () => dispatch(reset())
  };
}

export default connect(mapState, mapDispatchToProps)(UserForm);
