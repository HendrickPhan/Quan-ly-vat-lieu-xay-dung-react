import React from "react";
// react-redux components
import { connect } from 'react-redux';
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { fetchImportBillDetail, updateImportBillStatus, reset } from './ImportBillDetailAction';
// react-router-doom components
import { generatePath } from "react-router";

// core components
import ImportBillDetailView from "./ImportBillDetailView";


class ImportBillDetail extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        importBillDetails: props.importBillDetails,
        vendorName: props.vendorName,
        vendorEmail: props.vendorEmail,
        totalBill: props.totalBill,
        totalPaid: props.totalPaid,
    };
  }

  componentDidMount() {    
    if (this.props.match.params.id != 'add') {
      this.props.fetchImportBillDetail(this.props.match.params.id);
    }
    //this.props.fetchImportBillDetail(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      fetching: nextProps.fetching,
      fetched: nextProps.fetched,
      importBillDetails: nextProps.importBillDetails,
      vendorName: nextProps.vendorName,
      vendorEmail: nextProps.vendorEmail,
      totalBill: nextProps.totalBill,
      totalPaid: nextProps.totalPaid,    
      fetchImportBillDetail: (id) => nextProps.fetchImportBillDetail(id),
      updateImportBillStatus: (id) => nextProps.updateImportBillStatus(id),
      reset: () => nextProps.reset(),
      error: nextProps.error
    });
  }

  //------------------- event functions 
  handleUpdateStatus(e) {
    this.props.updateImportBillStatus(this.props.match.params.id);
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
        vendorName={this.state.vendorName}
        vendorEmail={this.state.vendorEmail}
        totalPaid = { this.state.totalPaid }
        totalBill = { this.state.totalBill }
        handleUpdateStatus={(e) => this.handleUpdateStatus(e)}
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
  vendorName: state.importBillDetail.vendorName,
  vendorEmail: state.importBillDetail.vendorEmail,
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
