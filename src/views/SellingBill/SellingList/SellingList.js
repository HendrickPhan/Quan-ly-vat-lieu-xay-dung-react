import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { TablePagination } from '@material-ui/core';
import MaterialTable from 'material-table';
// react-redux components
import { connect } from 'react-redux';
import { fetchSellingBills, changePerPage, getUserRole } from './SellingListAction';

// react-router-doom components
import { withRouter } from "react-router-dom";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import SellingListView from "./SellingListView"

class SellingBill extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      perPage:props.perPage,
      totalRows:props.totalRows,
      currentPage:props.currentPage,
      changePerPage:(value) => props.changePerPage(value),
      fetchSellingBills:(currentPage, perPage) => props.fetchSellingBills(currentPage, perPage),
      getUserRole:() => props.getUserRole(),
      sellingBills:props.sellingBills,
      userRole: props.userRole,
    };
    console.log('props selling-list', props);
  }

  componentDidMount() {
    this.state.fetchSellingBills(this.state.currentPage, this.state.perPage);
    this.state.getUserRole();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      perPage: nextProps.perPage,
      totalRows: nextProps.totalRows,
      currentPage: nextProps.currentPage,
      changePerPage: (value) => nextProps.changePerPage(value),
      getUserRole: () => nextProps.getUserRole(),
      fetchSellingBills: (currentPage, perPage) => nextProps.fetchSellingBills(currentPage, perPage),
      sellingBills: nextProps.sellingBills,
      userRole: nextProps.userRole
    });
    console.log('next props selling', nextProps);
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
      <SellingListView
        perPage = { this.state.perPage }
        totalRows = { this.state.totalRows }
        currentPage = { this.state.currentPage }
        changePerPage = { (value) => this.state.changePerPage(value) }
        fetchSellingBills = { (currentPage, perPage) => this.state.fetchSellingBills(currentPage, perPage) }
        getUserRole = { () => this.state.getUserRole() }
        userRole = { this.state.userRole }
        sellingBills = {this.state.sellingBills}
        viewDetailBill = {(id)=>this.viewDetailBill(id)}
        onAddClickHandle = {()=>this.onAddClickHandle()}
        onDeleteClickHandle = {(id)=>this.onDeleteClickHandle(id)}
      />     
    );
  }
}

const mapState = state => ({
  fetching: state.sellingBill.fetching,
  fetched: state.sellingBill.fetched,
  sellingBills: state.sellingBill.sellingBills,
  //userRole: state.SellingBill.userRole,
  currentPage: state.sellingBill.currentPage,
  totalRows: state.sellingBill.totalRows,
  perPage: state.sellingBill.perPage,
  error: state.sellingBill.error
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSellingBills: (page, perPage) => dispatch(fetchSellingBills(page, perPage)),
    getUserRole: () => dispatch(getUserRole()),
    changePerPage: (perPage) => dispatch(changePerPage(perPage)),
  };
}

export default connect(mapState, mapDispatchToProps)(SellingBill);