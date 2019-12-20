import React from "react";
// react-redux components
import { connect } from 'react-redux';
import { getUserRole } from '../../../routes/UserRoleStatic';
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { fetchSellingBillDetail, updateSellingBillStatus, reset, fetchSellingTransaction, addSellingTransaction } from './SellingBillDetailAction';
// react-router-doom components
import { generatePath } from "react-router";

// core components
import SellingBillDetailView from "./SellingBillDetailView.jsx";

var userRole = getUserRole;

class SellingBillDetail extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        sellingBillDetails: props.sellingBillDetails,
        transactions: props.transactions,
        customerName: props.customerName,
        customerPhone: props.customerPhone,
        totalBill: props.totalBill,
        totalPaid: props.totalPaid,
        amountTrans: props.amountTrans,
    };
  }

  componentDidMount() {    
    this.props.fetchSellingBillDetail(this.props.match.params.id);
    this.props.fetchSellingTransaction(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      fetching: nextProps.fetching,
      fetched: nextProps.fetched,
      sellingBillDetails: nextProps.sellingBillDetails,
      customerName: nextProps.customerName,
      customerPhone: nextProps.customerPhone,
      totalBill: nextProps.totalBill,
      totalPaid: nextProps.totalPaid,
      transactions: nextProps.transactions,
      amountTrans: nextProps.amountTrans,
      fetchSellingBillDetail: (id) => nextProps.fetchSellingBillDetail(id),
      fetchSellingTransaction: (id) => nextProps.fetchSellingTransaction(id),
      updateSellingBillStatus: (id) => nextProps.updateSellingBillStatus(id),
      addSellingTransaction: (data) => nextProps.addSellingTransaction(data),
      reset: () => nextProps.reset(),
      error: nextProps.error
    });
  }

  //------------------- event functions 
  handleSubmit(e, id) {
    this.props.updateSellingBillStatus(id);
  }
  handleAddTransaction(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    let data = [];
    data['amount'] = formData.get('amount');
    data['selling_bill_id'] = this.props.match.params.id;
    
    this.props.addSellingTransaction(data);
  }
  handleChangeAmount(e){
    alert(e.target.value);
  }

  calTotalBill(){
    let total = 0
    this.state.sellingBillDetail.forEach(function(simpleProduct, index) {
      let totalProduct = simpleProduct.price * simpleProduct.quantity;
      total += totalProduct; 
      // this.state.totalBill += totalProduct;
    });
    // console.log('VAT', this.calVAT(total));
    // total += this.calVAT(total);
    this.setState({totalBill: total});
  }

  redirect(e){
    this.props.history.goBack();
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
      <SellingBillDetailView
        fetched={this.state.fetched}
        sellingBillDetails={this.state.sellingBillDetails}
        customerName={this.state.customerName}
        customerPhone={this.state.customerPhone}
        totalPaid = { this.state.totalPaid }
        totalBill = { this.state.totalBill }
        amountTrans = { this.state.amountTrans }
        transactions = { this.state.transactions }
        handleSubmit={(e, id) => this.handleSubmit(e, id)}
        handleAddTransaction={(e) => this.handleAddTransaction(e)}
        redirect={e => this.redirect(e)}
      />
    );
  }
}


const mapState = state => ({
  fetching: state.sellingBillDetail.fetching,
  fetched: state.sellingBillDetail.fetched,
  sellingBillDetails: state.sellingBillDetail.sellingBillDetails,
  transactions: state.sellingBillDetail.transactions,
  totalBill: state.sellingBillDetail.totalBill,
  totalPaid: state.sellingBillDetail.totalPaid,
  customerName: state.sellingBillDetail.customerName,
  customerPhone: state.sellingBillDetail.customerPhone,
  error: state.sellingBillDetail.error,
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSellingBillDetail: (id) => dispatch(fetchSellingBillDetail(id)),
    fetchSellingTransaction: (id) => dispatch(fetchSellingTransaction(id)),
    addSellingTransaction: (data) => dispatch(addSellingTransaction(data)),
    updateSellingBillStatus: (id) => dispatch(updateSellingBillStatus(id)),
    reset: () => dispatch(reset())
  };
}

export default connect(mapState, mapDispatchToProps)(SellingBillDetail);