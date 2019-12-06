import React from "react";
// react-redux components
import { connect } from 'react-redux';
import { fetchProducts, fetchCategories, reset } from './SellingBillAction';
// react-router-doom components
import { generatePath } from "react-router";

// core components
import SellingBillFormView from "./step1/Step1View";

//
import { makeStyles } from "@material-ui/core/styles";
import MaterialTable from 'material-table';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import SaveIcon from '@material-ui/icons/Save';
import Chip from '@material-ui/core/Chip';
//


class SellingBillForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      products: props.products,
      categories: props.categories,
      keyword: null,
      category: null,
    };
  }

  componentDidMount() {
    let { productListCurrentPage, productListPerPage } = this.props;
    let { keyword, category } = this.state;
    this.props.fetchProducts(productListCurrentPage, productListPerPage, keyword, category);
    this.props.fetchCategories(this.props.match.params.id);

    // if (this.props.match.params.id != 'add') {
    //   this.props.fetchProduct(this.props.match.params.id);
    // }
    // else {
    //   this.props.reset();
    // }
    // this.props.fetchCategorySelectList();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      products: nextProps.products,
      categories: nextProps.categories,
      fetchProducts: (page, perPage, keyword, category) => nextProps.fetchProducts(page, perPage, keyword, category),
      addProduct: (id, data) => nextProps.addProduct(id, data),
      reset: () => nextProps.reset(),
      sellingBillDetail: nextProps.sellingBillDetail,
      productListCurrentPage: nextProps.productListCurrentPage,
      productListTotalRows: nextProps.productListTotalRows,
      productListPerPage: nextProps.productListPerPage,
      step: nextProps.step,
    });
  }

  //------------------- event functions 
  handleSubmit(e) {
    e.preventDefault();
    let data = (({ name, price, unit, images }) => ({ name, price, unit, images }))(this.state.product);
    let categories = this.state.product.categories.map(category => category.id);
    data.categories = categories;
    if (this.state.product.id) {
      data.deleteImages = this.state.deleteImages;
      this.state.editProduct(this.state.product.id, data);
    }
    else {
      const { history } = this.props;
      this.state.addProduct(data).then(product => {
        history.push({
          pathname: generatePath(this.props.match.path, { id: product.id })
        });
        this.props.fetchProduct(product.id);

      });
    }
  }

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      product: {
        ...prevState.product,
        [name]: value
      }
    }));

  }

  handleCategorySelectChange = e => {
    let categories = this.state.categorySelectList.filter(category => e.target.value.includes(category.id));
    this.setState(prevState => ({
      product: {
        ...prevState.product,
        categories: categories
      }
    }));

  };

  handleImagesChange = e => {
    const { files } = e.target;

    this.setState(prevState => ({
      product: {
        ...prevState.product,
        images: files
      }
    }));
  }

  handleImageRestoreClick = e => {
    const { value } = e.currentTarget;
    let deleteImages = this.state.deleteImages.filter(deleteImage => deleteImage !== Number(value));

    this.setState(prevState => ({
      deleteImages: deleteImages
    }));
  }

  handleImageDeleteClick = e => {
    const { value } = e.currentTarget;
    let deleteImages = this.state.deleteImages;
    deleteImages.push(Number(value));
    this.setState(prevState => ({
      deleteImages: deleteImages
    }), () => {
      console.log(this.state);
    });
  }
  //

  render() {
    if (this.props.error) {
      alert(this.props.error);
    }

    return (
      <SellingBillFormView
        categories={this.state.categories}
        products={this.state.products}
      />
    );
  }
}


const mapState = state => ({
  sellingBillDetail: state.sellingBillForm.sellingBillDetail,
  categories: state.sellingBillForm.categories,
  products: state.sellingBillForm.products,
  productListCurrentPage: state.sellingBillForm.productListCurrentPage,
  productListTotalRows: state.sellingBillForm.productListTotalRows,
  productListPerPage: state.sellingBillForm.productListPerPage,
  step: state.sellingBillForm.step,
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProducts: (page, perPage, keyword, category) => dispatch(fetchProducts(page, perPage, keyword, category)),
    fetchCategories: () => dispatch(fetchCategories()),
    reset: () => dispatch(reset())
  };
}

export default connect(mapState, mapDispatchToProps)(SellingBillForm);
