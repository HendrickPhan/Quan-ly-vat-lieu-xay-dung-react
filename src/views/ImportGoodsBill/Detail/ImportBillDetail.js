import React from "react";
// react-redux components
import { connect } from 'react-redux';
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { fetchImportBillDetail, updateImportBillStatus, reset } from './SellingBillDetailAction';
// react-router-doom components
import { generatePath } from "react-router";

// core components
import ImportBillDetailView from "./ImportBillDetailView";


class ImportBillDetail extends React.Component {

  constructor(props) {
    //console.log('this is constructor');
    super(props);

    this.state = {
        importBillDetails: props.importBillDetails,
        customerName: props.customerName,
        customerPhone: props.customerPhone,
        totalBill: props.totalBill,
        totalPaid: props.totalPaid
    };
  }

  componentDidMount() {
    console.log(this.props.match.params.id);
    
    this.props.fetchImportBillDetail(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      fetching: nextProps.fetching,
      fetched: nextProps.fetched,
      importBillDetails: nextProps.importBillDetails,
      customerName: nextProps.customerName,
      customerPhone: nextProps.customerPhone,
      totalBill: nextProps.totalBill,
      totalPaid: nextProps.totalPaid,
      fetchImportBillDetail: (id) => nextProps.fetchImportBillDetail(id),
      updateImportBillStatus: (id) => nextProps.updateImportBillStatus(id),
      reset: () => nextProps.reset(),
      error: nextProps.error
    });
  }

  //------------------- event functions 
  handleSubmit(e, id) {
    this.props.updateImportBillStatus(id);
  }

  calTotalBill(){
    let total = 0
    this.state.importBillDetail.forEach(function(simpleProduct, index) {
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
      <ImportBillDetailView
        fetched={this.state.fetched}
        importBillDetails={this.state.importBillDetails}
        customerName={this.state.customerName}
        customerPhone={this.state.customerPhone}
        totalPaid = { this.state.totalPaid }
        totalBill = { this.state.totalBill }
        handleSubmit={(e, id) => this.handleSubmit(e, id)}
        redirect={e => this.redirect(e)}
      />
    );
  }
}


const mapState = state => ({
  fetching: state.importBillDetail.fetching,
  fetched: state.importBillDetail.fetched,
  importBillDetails: state.importBillDetail.importBillDetails,
  totalBill: state.importBillDetail.totalBill,
  totalPaid: state.importBillDetail.totalPaid,
  customerName: state.importBillDetail.customerName,
  customerPhone: state.importBillDetail.customerPhone,
  error: state.importBillDetail.error,
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchImportBillDetail: (id) => dispatch(fetchImportBillDetail(id)),
    updateImportBillStatus: (id) => dispatch(updateImportBillStatus(id)),
    reset: () => dispatch(reset())
  };
}

export default connect(mapState, mapDispatchToProps)(ImportBillDetail);
