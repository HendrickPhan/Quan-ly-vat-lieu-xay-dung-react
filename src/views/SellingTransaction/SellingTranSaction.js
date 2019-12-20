import React from "react";
// @material-ui/core components
// react-redux components
import { connect } from 'react-redux';
import { fetchUsers, changePerPage, deleteUser } from './UserActions';
// react-router-doom components
import { withRouter } from "react-router-dom";
// core components
import UserView from "./UserView.jsx"

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      perPage:props.perPage,
      totalRows:props.totalRows,
      currentPage:props.currentPage,
      changePerPage:(value) => props.changePerPage(value),
      fetchUsers:(currentPage, perPage) => props.fetchUsers(currentPage, perPage),
      users:props.users
    };
  }

  componentDidMount() {
    this.props.fetchUsers(this.state.currentPage, this.state.perPage);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      perPage: nextProps.perPage,
      totalRows: nextProps.totalRows,
      currentPage: nextProps.currentPage,
      changePerPage: (value) => nextProps.changePerPage(value),
      fetchUsers: (currentPage, perPage) => nextProps.fetchUsers(currentPage, perPage),
      users: nextProps.users
    });
  }

  

  render() {
    if (this.props.error) {
      alert(this.props.error);
    }

    return (
      <UserView
        perPage={this.state.perPage}
        totalRows={this.state.totalRows}
        currentPage={this.state.currentPage}
        changePerPage={ (value) => this.state.changePerPage(value) }
        fetchUsers={ (currentPage, perPage) => this.state.fetchUsers(currentPage, perPage) }
        users={this.state.users}
        onEditClickHandle={(id)=>this.onEditClickHandle(id)}
        onAddClickHandle={()=>this.onAddClickHandle()}
        onDeleteClickHandle={(id)=>this.onDeleteClickHandle(id)}
      />
     
    );
  }
}

const mapState = state => ({
  fetching: state.user.fetching,
  fetched: state.user.fetched,
  users: state.user.users,
  currentPage: state.user.currentPage,
  totalRows: state.user.totalRows,
  perPage: state.user.perPage,
  error: state.user.error
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: (page, perPage) => dispatch(fetchUsers(page, perPage)),
    changePerPage: (perPage) => dispatch(changePerPage(perPage)),
    deleteUser: (id) => dispatch(deleteUser(id))
  };
}

export default connect(mapState, mapDispatchToProps)(User);
