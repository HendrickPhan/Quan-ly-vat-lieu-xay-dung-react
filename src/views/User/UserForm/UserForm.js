import React from "react";
// react-redux components
import { connect } from 'react-redux';
import { fetchUser, editUser, addUser, reset, fetchAgency } from './UserFormActions';
// react-router-doom components
import { generatePath } from "react-router";

// core components
import UserFormView from "./UserFormView.jsx";


class UserForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      user: {
        id: null,
        name: '',
        phone: '',
        email: '',
        in_debt_amount: 0,
        avatar: '',
        role:{'id': 0, 'name': 'Admin'},
        agency_id: 0,
        password: '',
        retype_psw: '',
      },
      roles: [
        {
          'id': 0,
          'name': 'Admin'
        },
        {
          'id':1,
          'name': 'manager'
        },
        {
          'id':2,
          'name': 'assistant Staff'
        },
        {
          'id':3,
          'name': 'Agency Manager'
        },
        {
          'id':4,
          'name': 'Bussiness Staff'
        },
        {
          'id':5,
          'name': 'Warehouse Staff'
        }
      ],
      agencies: []
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

  handleImageChange = e => {
    const { files } = e.target;

    this.setState(prevState => ({
      user: {
        ...prevState.user,
        avatar: files
      }
    }), ()=>{console.log(this.state)});
  }

  handleSubmit(e) {
    e.preventDefault();
    let  { avatar, name, role, phone, email, password } = this.state.user;

    let data = {
      avatar: avatar, 
      name: name,
      role: role,
      phone: phone,
      email: email,
    }

    if(password) {
      data.password = password 
    }
    
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
    
    this.props.fetchAgency();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      fetching: nextProps.fetching,
      fetched: nextProps.fetched,
      user: nextProps.user,
      fetchUser: (id) => nextProps.fetchUser(id),
      editUser: (id, data) => nextProps.editUser(id, data),
      addUser: (data) => nextProps.addUser(data),
      fetchAgency: () => nextProps.fetchAgency(),
    
      reset: () =>  nextProps.reset(),
      error: nextProps.error,
      agencies: nextProps.agencies
    });
  }

  handleRoleChange = e => {
    const { value, name } = e.target;
    this.setState(prevState => ({
      user: {
        ...prevState.user,
        role: value
      }
    }));

    console.log('agency:', this.state);

  };

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
        handleRoleChange={(e) => this.handleRoleChange(e)}
        handleImageChange={e => this.handleImageChange(e)}
        agencies={this.state.agencies}
      />
    );
  }
}

const mapState = state => ({
  fetching: state.userForm.fetching,
  fetched: state.userForm.fetched,
  user: state.userForm.user,
  agencies: state.userForm.agencies,
  error: state.userForm.error
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: (id) => dispatch(fetchUser(id)),
    editUser: (id, data) => dispatch(editUser(id, data)),
    addUser: (data) => dispatch(addUser(data)),
    fetchAgency: () => dispatch(fetchAgency()),
    reset: () => dispatch(reset())
  };
}



export default connect(mapState, mapDispatchToProps)(UserForm);
