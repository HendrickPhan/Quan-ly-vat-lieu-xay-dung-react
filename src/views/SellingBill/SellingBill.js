import React from "react";
// react-redux components
import { connect } from 'react-redux';
import { fetchProducts, fetchCategories, fetchCustomers, reset, addSellingBill } from './SellingBillAction';
// react-router-doom components
import { generatePath } from "react-router";

// core components
import SellingBillStep1 from "./step1/Step1View";
import SellingBillStep2 from "./step2/Step2View";
import SellingBillStep3 from "./step3/Step3View";

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
//import SellingBillFormView from "./SellingBillForm/SellingBillFormView";
//


class SellingBillForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      products: props.products,
      sellingBillDetail: props.sellingBillDetail,
      categories: props.categories,
      customers: props.customers,
      totalBill: props.totalBill,
      totalPaid: props.totalPaid,
      keyword: null,
      category: null,
      currentCustomer: props.currentCustomer,
      currentCategory: props.currentCategory
    };
  }

  componentDidMount() {
    let { productListCurrentPage, productListPerPage } = this.props;
    let { keyword, category } = this.state;
    this.props.fetchProducts(productListCurrentPage, productListPerPage, keyword, category);
    this.props.fetchCategories(this.props.match.params.id);
    this.props.fetchCustomers(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      products: nextProps.products,
      sellingBillDetail: nextProps.sellingBillDetail,
      categories: nextProps.categories,
      currentCategory: nextProps.currentCategory,
      currentCustomer: nextProps.currentCustomer,
      customers: nextProps.customers,
      totalBill: nextProps.totalBill,
      totalPaid: nextProps.totalPaid,
      fetchProducts: (page, perPage, keyword, category) => nextProps.fetchProducts(page, perPage, keyword, category),
      addSellingBill: (data) => nextProps.addSellingBill(data),
      reset: () => nextProps.reset(),
      productListCurrentPage: nextProps.productListCurrentPage,
      productListTotalRows: nextProps.productListTotalRows,
      productListPerPage: nextProps.productListPerPage,
      step: nextProps.step,
    });
  }

  //------------------- event functions 
  handleSubmit(e) {
    e.preventDefault();
    let data = [];
    data.details =this.createDetailList();
    data.total_paid = this.state.totalPaid;
    data.customer_id = this.state.currentCustomer.id;
    this.props.addSellingBill(data);
  }

  createDetailList(){
    let result = [];
  
    this.state.sellingBillDetail.forEach(function(simpleProduct, index) {
      let productDetail = [];
      productDetail.product_id = simpleProduct.id;
      productDetail.quantity = simpleProduct.quantity;

      result.push(productDetail);
    });

    return result;
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

  handleKeywordChange(e) {
    const { name, value } = e.target;
    this.setState({keyword: value});
  }

  handleCustomerChange(e, value){
    this.setState({currentCustomer: value});
  }

  handleQuantityChange = (quantity, product) => {
      let productList = this.props.products;
      this.state.products.forEach(function(simpleProduct, index) {
            if(simpleProduct.id === product.id){
                productList[index].quantity = quantity.target.value;                  
            }
      });

      this.setState({products: productList})
  }

  handleAddProduct = (e, product) => {
    let flag = false;
    this.props.sellingBillDetail.forEach(function myFunction(item, index) {
      if(item.id === product.id){
        flag = true;
      }
    }); 
    if(!flag)
      this.props.sellingBillDetail.push(product);
    this.forceUpdate();
  }

  handleRemoveProduct = (e, product) => {
    let index = -1;
    //console.log('product', product.id);
    this.props.sellingBillDetail.forEach( (sellingBill, i) => {
      console.log(sellingBill.id);
      if(sellingBill.id == product.id)
        index = i;
    });

    this.props.sellingBillDetail.splice(index, 1);
    this.forceUpdate();
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

  handleTotalPaidChange = (value) => {
    this.setState({totalPaid: value.target.value});
  }

  moveNextStep(e){
    switch(this.state.step)
    {
      case 1: 
        if(this.state.sellingBillDetail.length > 0){
          let nextStep = this.state.step + 1;
          this.setState({step: nextStep});
          this.calTotalBill();
        }
        break;
      case 2:
        if(this.state.currentCustomer !== null){
          let nextStep = this.state.step + 1;
          this.setState({step: nextStep});
          this.calTotalBill();
        }
        break;
    }
  }
  movePrevStep(e){
      let prevStep = this.state.step - 1;
      this.setState({step: prevStep});
  }
  
  calVAT(value){
    return value * 0.1;
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
    return 1000;
  }

  //
  render() {
    if (this.props.error) {
      alert(this.props.error);
    }   
    console.log('ste 2', this.state.sellingBillDetail)
    switch(this.state.step){
      case 2:
        return (
          <SellingBillStep2
            categories={this.state.categories}
            products={this.state.products}
            customers = { this.state.customers }
            currentCustomer = { this.state.currentCustomer }
            totalBill = { this.state.totalBill }
            sellingBillDetail = { this.state.sellingBillDetail }
            handleQuantityChange={(e, product)=>this.handleQuantityChange(e, product)}
            handleAddProduct={(e, product) => this.handleAddProduct(e, product)}
            handleCustomerChange = { (e, customer) => this.handleCustomerChange(e, customer)}
            handleRemoveProduct={(e, product) => this.handleRemoveProduct(e, product)}
            moveNextStep = { (e) => this.moveNextStep(e) }
            movePrevStep = { (e) => this.movePrevStep(e) }
            calTotalBill = { () =>this.calTotalBill()}
          />
        )
        break;
      case 3:
        return (
          <SellingBillStep3
            products={ this.state.products }
            totalBill = { this.state.totalBill }
            totalPaid = { this.state.totalPaid }
            currentCustomer = { this.state.currentCustomer }
            sellingBillDetail = { this.state.sellingBillDetail }
            handleQuantityChange={(e, product)=>this.handleQuantityChange(e, product)}
            handleTotalPaidChange={(e)=>this.handleTotalPaidChange(e)}
            handleAddProduct={(e, product) => this.handleAddProduct(e, product)}
            moveNextStep = { (e) => this.moveNextStep(e) }
            movePrevStep = { (e) => this.movePrevStep(e) }
            handleSubmit = { (e) => this.handleSubmit(e) }
            calTotalBill = { (e) =>this.calTotalBill(e) }
          />
        )
        break;
      default:
        return (
          <SellingBillStep1
            categories={this.state.categories}
            products={this.state.products}
            customers = { this.state.customers }
            currentCategory = { this.state.currentCategory }
            currentCustomer = { this.state.currentCustomer }
            sellingBillDetail = { this.state.sellingBillDetail }
            handleQuantityChange={(e, product)=>this.handleQuantityChange(e, product)}
            handleAddProduct={(e, product) => this.handleAddProduct(e, product)}
            handleKeywordChange = {(e) => this.handleKeywordChange(e)}
            moveNextStep = { (e) => this.moveNextStep(e) }
          />
        )
    };
  
   
  }
}


const mapState = state => ({
  sellingBillDetail: state.sellingBillForm.sellingBillDetail,
  categories: state.sellingBillForm.categories,
  customers: state.sellingBillForm.customers,
  currentCustomer: state.sellingBillForm.currentCustomer,
  products: state.sellingBillForm.products,
  totalBill: state.sellingBillForm.calTotalBill,
  totalPaid: state.sellingBillForm.totalPaid,
  productListCurrentPage: state.sellingBillForm.productListCurrentPage,
  productListTotalRows: state.sellingBillForm.productListTotalRows,
  productListPerPage: state.sellingBillForm.productListPerPage,
  step: state.sellingBillForm.step,
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProducts: (page, perPage, keyword, category) => dispatch(fetchProducts(page, perPage, keyword, category)),
    fetchCategories: () => dispatch(fetchCategories()),
    fetchCustomers: () => dispatch(fetchCustomers()),
    addSellingBill: (data) => dispatch(addSellingBill(data)),
    reset: () => dispatch(reset())
  };
}

export default connect(mapState, mapDispatchToProps)(SellingBillForm);
