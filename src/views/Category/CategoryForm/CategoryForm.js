import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import MaterialTable from 'material-table';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';

// react-redux components
import { connect } from 'react-redux';
import { fetchCategory, fetchCategorySelectList, editCategory, addCategory, reset } from './CategoryFormActions';
// react-router-doom components
import { generatePath } from "react-router";

// core components
import CategoryFormView from "./CategoryFromView.jsx";


class CategoryForm extends React.Component {

  constructor(props) {
    super(props);

    // reset login status
    // this.props.logout();

    this.state = {
      category: {
        name: '',
        id: null,
      },
      categorySelectList: []
    };

    // this.handlePaginationClick = this.handlePaginationClick.bind(this);
  }

  // handlePaginationClick(e) {
  //   e.preventDefault();
  //   this.props.fetchCategories(e.value);
  // }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState(prevState => ({
      category: {
        ...prevState.category,
        [name]: value
      }
    }));

  }

  handleSubmit(e) {
    e.preventDefault();
    let data = (({ name, parent_id }) => ({ name, parent_id }))(this.state.category);
    
    if(this.state.category.id){
      this.state.editCategory(this.state.category.id, data);
    } 
    else {
      const { history } = this.props;
      this.state.addCategory(data).then( category => {
        history.push({
          // this.props.match.path + `/${category.id}`
          pathname: generatePath(this.props.match.path, {id: category.id})
        });
        this.props.fetchCategory(category.id);

      }); 
    } 
  }


  componentDidMount() {
    if (this.props.match.params.id != 'add') {
      this.props.fetchCategory(this.props.match.params.id);
    }
    else{
      this.props.reset();
    }
    this.props.fetchCategorySelectList();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      fetching: nextProps.fetching,
      fetched: nextProps.fetched,
      category: nextProps.category,
      categorySelectList: nextProps.categorySelectList,
      fetchCategory: (id) => nextProps.fetchCategory(id),
      editCategory: (id, data) => nextProps.editCategory(id, data),
      addCategory: (data) => nextProps.addCategory(data),
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
      <CategoryFormView
        fetched={this.state.fetched}
        category={this.state.category}
        categorySelectList={this.props.categorySelectList}
        handleChange={(e) => this.handleChange(e)}
        handleSubmit={(e) => this.handleSubmit(e)}
      />
    );
  }
}


const mapState = state => ({
  fetching: state.categoryForm.fetching,
  fetched: state.categoryForm.fetched,
  category: state.categoryForm.category,
  categorySelectList: state.categoryForm.categorySelectList,
  error: state.categoryForm.error
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCategory: (id) => dispatch(fetchCategory(id)),
    fetchCategorySelectList: () => dispatch(fetchCategorySelectList()),
    editCategory: (id, data) => dispatch(editCategory(id, data)),
    addCategory: (data) => dispatch(addCategory(data)),
    reset: () => dispatch(reset())

  };
}

export default connect(mapState, mapDispatchToProps)(CategoryForm);
