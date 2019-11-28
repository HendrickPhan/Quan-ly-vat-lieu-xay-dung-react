import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { TablePagination } from '@material-ui/core';
import MaterialTable from 'material-table';
// react-redux components
import { connect } from 'react-redux';
import { fetchCategories, changePerPage, deleteCategory } from './CategoryActions';
// react-router-doom components
import { withRouter } from "react-router-dom";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CategoryView from "./CategoryView.jsx"

class Category extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      perPage:props.perPage,
      totalRows:props.totalRows,
      currentPage:props.currentPage,
      changePerPage:(value) => props.changePerPage(value),
      fetchCategories:(currentPage, perPage) => props.fetchCategories(currentPage, perPage),
      categories:props.categories
    };
  }

  componentDidMount() {
    this.state.fetchCategories(this.state.currentPage, this.state.perPage);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      perPage: nextProps.perPage,
      totalRows: nextProps.totalRows,
      currentPage: nextProps.currentPage,
      changePerPage: (value) => nextProps.changePerPage(value),
      fetchCategories: (currentPage, perPage) => nextProps.fetchCategories(currentPage, perPage),
      categories: nextProps.categories
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
    let conf = window.confirm(`Xóa category với id là ${id} ?`)
    if (conf){
      this.props.deleteCategory(id).then(
        () => this.state.fetchCategories(this.state.currentPage, this.state.perPage)
      );
    }
  }


  render() {
    if (this.props.error) {
      alert(this.props.error);
    }

    
    return (
      <CategoryView
        perPage={this.state.perPage}
        totalRows={this.state.totalRows}
        currentPage={this.state.currentPage}
        changePerPage={ (value) => this.state.changePerPage(value) }
        fetchCategories={ (currentPage, perPage) => this.state.fetchCategories(currentPage, perPage) }
        categories={this.state.categories}
        onEditClickHandle={(id)=>this.onEditClickHandle(id)}
        onAddClickHandle={()=>this.onAddClickHandle()}
        onDeleteClickHandle={(id)=>this.onDeleteClickHandle(id)}
      />
     
    );
  }
}

const mapState = state => ({
  fetching: state.category.fetching,
  fetched: state.category.fetched,
  categories: state.category.categories,
  currentPage: state.category.currentPage,
  totalRows: state.category.totalRows,
  perPage: state.category.perPage,
  error: state.category.error
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCategories: (page, perPage) => dispatch(fetchCategories(page, perPage)),
    changePerPage: (perPage) => dispatch(changePerPage(perPage)),
    deleteCategory: (id) => dispatch(deleteCategory(id))
  };
}

export default connect(mapState, mapDispatchToProps)(Category);
