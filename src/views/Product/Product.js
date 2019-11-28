import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { TablePagination } from '@material-ui/core';
import MaterialTable from 'material-table';
// react-redux components
import { connect } from 'react-redux';
import { fetchProducts, changePerPage, deleteProduct } from './ProductActions';
// react-router-doom components
import { withRouter } from "react-router-dom";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import ProductView from "./ProductView.jsx"

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      perPage:props.perPage,
      totalRows:props.totalRows,
      currentPage:props.currentPage,
      changePerPage:(value) => props.changePerPage(value),
      fetchProducts:(currentPage, perPage) => props.fetchProducts(currentPage, perPage),
      products:props.products
    };
  }

  componentDidMount() {
    this.state.fetchProducts(this.state.currentPage, this.state.perPage);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      perPage: nextProps.perPage,
      totalRows: nextProps.totalRows,
      currentPage: nextProps.currentPage,
      changePerPage: (value) => nextProps.changePerPage(value),
      fetchProducts: (currentPage, perPage) => nextProps.fetchProducts(currentPage, perPage),
      products: nextProps.products
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
    let conf = window.confirm(`Xóa product với id là ${id} ?`)
    if (conf){
      this.props.deleteProduct(id).then(
        () => this.state.fetchProducts(this.state.currentPage, this.state.perPage)
      );
    }
  }


  render() {
    if (this.props.error) {
      alert(this.props.error);
    }

    
    return (
      <ProductView
        perPage={this.state.perPage}
        totalRows={this.state.totalRows}
        currentPage={this.state.currentPage}
        changePerPage={ (value) => this.state.changePerPage(value) }
        fetchProducts={ (currentPage, perPage) => this.state.fetchProducts(currentPage, perPage) }
        products={this.state.products}
        onEditClickHandle={(id)=>this.onEditClickHandle(id)}
        onAddClickHandle={()=>this.onAddClickHandle()}
        onDeleteClickHandle={(id)=>this.onDeleteClickHandle(id)}
      />
     
    );
  }
}

const mapState = state => ({
  fetching: state.product.fetching,
  fetched: state.product.fetched,
  products: state.product.products,
  currentPage: state.product.currentPage,
  totalRows: state.product.totalRows,
  perPage: state.product.perPage,
  error: state.product.error
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProducts: (page, perPage) => dispatch(fetchProducts(page, perPage)),
    changePerPage: (perPage) => dispatch(changePerPage(perPage)),
    deleteProduct: (id) => dispatch(deleteProduct(id))
  };
}

export default connect(mapState, mapDispatchToProps)(Product);
