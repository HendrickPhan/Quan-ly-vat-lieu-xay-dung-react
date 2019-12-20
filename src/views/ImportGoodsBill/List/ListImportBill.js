import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { TablePagination } from '@material-ui/core';
import MaterialTable from 'material-table';
// react-redux components
import { connect } from 'react-redux';
import { fetchImportBills, changePerPage, getUserRole } from './ListImportBillAction';

// react-router-doom components
import { withRouter } from "react-router-dom";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import ListImportBillView from "./ListImportBillView.jsx"

class SellingBill extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      perPage:props.perPage,
      totalRows:props.totalRows,
      currentPage:props.currentPage,
      changePerPage:(value) => props.changePerPage(value),
      fetchImportBills:(currentPage, perPage) => props.fetchImportBills(currentPage, perPage),
      getUserRole:() => props.getUserRole(),
      importBills:props.importBills,
      userRole: props.userRole,
    };
  }

  componentDidMount() {
    this.state.fetchImportBills(this.state.currentPage, this.state.perPage);
    this.state.getUserRole();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      perPage: nextProps.perPage,
      totalRows: nextProps.totalRows,
      currentPage: nextProps.currentPage,
      changePerPage: (value) => nextProps.changePerPage(value),
      getUserRole: () => nextProps.getUserRole(),
      fetchImportBills: (currentPage, perPage) => nextProps.fetchImportBills(currentPage, perPage),
      importBills: nextProps.importBills,
      userRole: nextProps.userRole
    });
    
  }

  viewDetailBill(id){
    const { history } = this.props;
    history.push(this.props.match.path + `/${id}`);
  }

  render() {
    if (this.props.error) {
      alert(this.props.error);
    }
    //console.log('state selling bill return', this.state);
    return ( 
      <ListImportBillView
        perPage = { this.state.perPage }
        totalRows = { this.state.totalRows }
        currentPage = { this.state.currentPage }
        changePerPage = { (value) => this.state.changePerPage(value) }
        fetchImportBills = { (currentPage, perPage) => this.state.fetchImportBills(currentPage, perPage) }
        getUserRole = { () => this.state.getUserRole() }
        userRole = { this.state.userRole }
        importBills = {this.state.importBills}
        viewDetailBill = {(id)=>this.viewDetailBill(id)}
        onAddClickHandle = {()=>this.onAddClickHandle()}
        onDeleteClickHandle = {(id)=>this.onDeleteClickHandle(id)}
      />     
    );
  }
}

const mapState = state => ({
  fetching: state.listImportBill.fetching,
  fetched: state.listImportBill.fetched,
  importBills: state.listImportBill.importBills,
  //userRole: state.SellingBill.userRole,
  currentPage: state.listImportBill.currentPage,
  totalRows: state.listImportBill.totalRows,
  perPage: state.listImportBill.perPage,
  error: state.listImportBill.error
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchImportBills: (page, perPage) => dispatch(fetchImportBills(page, perPage)),
    getUserRole: () => dispatch(getUserRole()),
    changePerPage: (perPage) => dispatch(changePerPage(perPage)),
  };
}

export default connect(mapState, mapDispatchToProps)(SellingBill);