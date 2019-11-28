import React from "react";
// react-redux components
import { connect } from 'react-redux';
import { fetchCustomer, editCustomer, addCustomer, reset } from './CustomerFormActions';
// react-router-doom components
import { generatePath } from "react-router";

// core components
import CustomerFormView from "./CustomerFromView.jsx";


class CustomerForm extends React.Component {

  constructor(props) {
    super(props);

    // reset login status
    // this.props.logout();

    this.state = {
      customer: {
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
      customer: {
        ...prevState.customer,
        [name]: value
      }
    }));

  }

  handleSubmit(e) {
    e.preventDefault();
    let data = (({ name, address, phone }) => ({ name, address, phone }))(this.state.customer);
    
    if(this.state.customer.id){
      this.props.editCustomer(this.state.customer.id, data);
    } 
    else {
      const { history } = this.props;
      this.props.addCustomer(data).then( customer => {
        history.push({
          pathname: generatePath(this.props.match.path, {id: customer.id})
        });
        this.props.fetchCustomer(customer.id);

      }); 
    } 
  }


  componentDidMount() {
    if (this.props.match.params.id != 'add') {
      this.props.fetchCustomer(this.props.match.params.id);
    }
    else{
      this.props.reset();
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      fetching: nextProps.fetching,
      fetched: nextProps.fetched,
      customer: nextProps.customer,
      fetchCustomer: (id) => nextProps.fetchCustomer(id),
      editCustomer: (id, data) => nextProps.editCustomer(id, data),
      addCustomer: (data) => nextProps.addCustomer(data),
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
      <CustomerFormView
        fetched={this.state.fetched}
        customer={this.state.customer}
        handleChange={(e) => this.handleChange(e)}
        handleSubmit={(e) => this.handleSubmit(e)}
      />
    );
  }
}


const mapState = state => ({
  fetching: state.customerForm.fetching,
  fetched: state.customerForm.fetched,
  customer: state.customerForm.customer,
  error: state.customerForm.error
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCustomer: (id) => dispatch(fetchCustomer(id)),
    editCustomer: (id, data) => dispatch(editCustomer(id, data)),
    addCustomer: (data) => dispatch(addCustomer(data)),
    reset: () => dispatch(reset())
  };
}

export default connect(mapState, mapDispatchToProps)(CustomerForm);
