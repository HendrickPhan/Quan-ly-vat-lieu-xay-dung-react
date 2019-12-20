import React from "react";
// @material-ui/core components
// react-redux components
import { connect } from 'react-redux';
import { fetchCustomers, changePerPage, deleteCustomer } from './CustomerActions';
// react-router-doom components
import { withRouter } from "react-router-dom";
// core components
import CustomerView from "./CustomerView.jsx"

class Customer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      perPage:props.perPage,
      totalRows:props.totalRows,
      currentPage:props.currentPage,
      changePerPage:(value) => props.changePerPage(value),
      fetchCustomers:(currentPage, perPage) => props.fetchCustomers(currentPage, perPage),
      customers:props.customers
    };
  }

  componentDidMount() {
    this.props.fetchCustomers(this.state.currentPage, this.state.perPage);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      perPage: nextProps.perPage,
      totalRows: nextProps.totalRows,
      currentPage: nextProps.currentPage,
      changePerPage: (value) => nextProps.changePerPage(value),
      fetchCustomers: (currentPage, perPage) => nextProps.fetchCustomers(currentPage, perPage),
      customers: nextProps.customers
    });
  }

  onEditClickHandle(id){
    const { history } = this.props;
    history.push(this.props.match.path + `/${id}`);
  }

  onAddClickHandle(id){
    const { history } = this.props;
    history.push(this.props.match.path + `/add`);
  }

  onDeleteClickHandle(id){
    let conf = window.confirm(`Xóa customer với id là ${id} ?`)
    if (conf){
      this.props.deleteCustomer(id).then(
        () => this.state.fetchCustomers(this.state.currentPage, this.state.perPage)
      );
    }
  }

  render() {
    if (this.props.error) {
      alert(this.props.error);
    }

    
    return (
      <CustomerView
        perPage={this.state.perPage}
        totalRows={this.state.totalRows}
        currentPage={this.state.currentPage}
        changePerPage={ (value) => this.state.changePerPage(value) }
        fetchCustomers={ (currentPage, perPage) => this.state.fetchCustomers(currentPage, perPage) }
        customers={this.state.customers}
        onEditClickHandle={(id)=>this.onEditClickHandle(id)}
        onAddClickHandle={()=>this.onAddClickHandle()}
        onDeleteClickHandle={(id)=>this.onDeleteClickHandle(id)}
      />
     
    );
  }
}

const mapState = state => ({
  fetching: state.customer.fetching,
  fetched: state.customer.fetched,
  customers: state.customer.customers,
  currentPage: state.customer.currentPage,
  totalRows: state.customer.totalRows,
  perPage: state.customer.perPage,
  error: state.customer.error
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCustomers: (page, perPage) => dispatch(fetchCustomers(page, perPage)),
    changePerPage: (perPage) => dispatch(changePerPage(perPage)),
    deleteCustomer: (id) => dispatch(deleteCustomer(id))
  };
}

export default connect(mapState, mapDispatchToProps)(Customer);
