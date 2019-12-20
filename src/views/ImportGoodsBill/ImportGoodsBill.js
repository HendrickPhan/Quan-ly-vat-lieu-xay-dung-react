import React from "react";
// react-redux components
import { connect } from 'react-redux';
import { fetchProducts, fetchCategories, fetchVendors, reset, addImportBill } from './ImportGoodsBillAction';
// react-router-doom components
import { generatePath } from "react-router";

import ImportBillStep1 from "./Step1/Step1";
import ImportBillStep2 from "./Step2/Step2";
import ImportBillStep3 from "./Step3/Step3";

class ImportBillForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      products: props.products,
      vendors: props.vendors,
      importBillDetail: props.importBillDetail,
      categories: props.categories,
      keyword: null,
      category: null,
      currentCategory: props.currentCategory,
      vendor_id: props.vendor_id
    };
  }

  componentDidMount() {
    


    let { productListCurrentPage, productListPerPage } = this.props;
    let { keyword, category } = this.state;
    this.props.fetchProducts(productListCurrentPage, productListPerPage, keyword, category);
    this.props.fetchCategories(this.props.match.params.id);
    this.props.fetchVendors(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      products: nextProps.products,
      importBillDetail: nextProps.importBillDetail,
      categories: nextProps.categories,
      vendors: nextProps.vendors,
      vendor_id: nextProps.vendor_id,
      currentCategory: nextProps.currentCategory,
      fetchProducts: (page, perPage, keyword, category) => nextProps.fetchProducts(page, perPage, keyword, category),
      addImportBill: (data) => nextProps.addImportBill(data),
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
    data.vendor_id = this.state.vendor_id;
    data.total_paid = this.state.totalBill;
    console.log('import bill data', data);
    this.props.addImportBill(data);
  }

  createDetailList(){
    let result = [];
  
    this.state.importBillDetail.forEach(function(simpleProduct, index) {
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

  handleQuantityChange = (quantity, product) => {
      let productList = this.props.products;
      this.state.products.forEach(function(simpleProduct, index) {
            if(simpleProduct.id === product.id){
                productList[index].quantity = quantity.target.value;                  
            }
      });
      this.setState({products: productList})
  }

  handleVendorChange = (e) => {
    console.log('target value', e.target.value);
    this.setState({vendor_id: e.target.value});
  }

  handleAddProduct = (e, product) => {
    let newProduct = product;
    this.props.importBillDetail.push(newProduct);
    this.forceUpdate();
  }

  handleRemoveProduct = (e, product) => {
    let index = -1;
    //console.log('product', product.id);
    this.props.importBillDetail.forEach( (importBill, i) => {
      console.log(importBill.id);
      if(importBill.id == product.id)
        index = i;
    });

    this.props.importBillDetail.splice(index, 1);
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
        if(this.state.importBillDetail.length > 0){
          let nextStep = this.state.step + 1;
          this.setState({step: nextStep});
          this.calTotalBill();
        }
        break;
      case 2:
          let nextStep = this.state.step + 1;
          this.setState({step: nextStep});
          this.calTotalBill();
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
    this.state.importBillDetail.forEach(function(simpleProduct, index) {
      let totalProduct = simpleProduct.price * simpleProduct.quantity;
      total += totalProduct; 
      // this.state.totalBill += totalProduct;
    });
    // console.log('VAT', this.calVAT(total));
    // total += this.calVAT(total);
    console.log('total', total);
    this.setState({totalBill: total});
  }

  //
  render() {
    if (this.props.error) {
      alert(this.props.error);
    }   
    switch(this.state.step){
      case 2:
        return (
          <ImportBillStep2
            categories={this.state.categories}
            products={this.state.products}
            currentCategory = { this.state.currentCategory }
            vendors = { this.state.vendors }
            vendor_id = {this.state.vendor_id}
            importBillDetail = { this.state.importBillDetail }
            handleQuantityChange={(e, product)=>this.handleQuantityChange(e, product)}
            handleVendorChange={(e)=>this.handleVendorChange(e)}
            handleAddProduct={(e, product) => this.handleAddProduct(e, product)}
            handleKeywordChange = {(e) => this.handleKeywordChange(e)}
            moveNextStep = { (e) => this.moveNextStep(e) }
            movePrevStep = { (e) => this.movePrevStep(e) }
          />
        )
        break;
      case 3:
          return (
            <ImportBillStep3
              categories={this.state.categories}
              products={this.state.products}
              currentCategory = { this.state.currentCategory }
              vendors = { this.state.vendors }
              vendor_id = {this.state.vendor_id}
              importBillDetail = { this.state.importBillDetail }
              handleQuantityChange={(e, product)=>this.handleQuantityChange(e, product)}
              handleVendorChange={(e)=>this.handleVendorChange(e)}
              handleAddProduct={(e, product) => this.handleAddProduct(e, product)}
              handleKeywordChange = {(e) => this.handleKeywordChange(e)}
              handleSubmit = {(e) => this.handleSubmit(e)}
              moveNextStep = { (e) => this.moveNextStep(e) }
              movePrevStep = { (e) => this.movePrevStep(e) }
              calTotalBill = { (e) =>this.calTotalBill(e) }
              totalBill = { this.state.totalBill }
              totalPaid = { this.state.totalPaid }
            />
          )
        break;
      default:
        return (
          <ImportBillStep1
            categories={this.state.categories}
            products={this.state.products}
            currentCategory = { this.state.currentCategory }
            vendors = { this.state.vendors }
            importBillDetail = { this.state.importBillDetail }
            handleQuantityChange={(e, product)=>this.handleQuantityChange(e, product)}
            handleVendorChange={(e, product)=>this.handleVendorChange(e, product)}
            handleAddProduct={(e, product) => this.handleAddProduct(e, product)}
            handleKeywordChange = {(e) => this.handleKeywordChange(e)}
            moveNextStep = { (e) => this.moveNextStep(e) }
          />
        )
    };
  }
}


const mapState = state => ({
  importBillDetail: state.importBillForm.importBillDetail,
  categories: state.importBillForm.categories,
  vendors: state.importBillForm.vendors,
  customers: state.importBillForm.customers,
  products: state.importBillForm.products,
  totalBill: state.importBillForm.calTotalBill,
  totalPaid: state.importBillForm.totalPaid,
  productListCurrentPage: state.importBillForm.productListCurrentPage,
  productListTotalRows: state.importBillForm.productListTotalRows,
  productListPerPage: state.importBillForm.productListPerPage,
  step: state.importBillForm.step,
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProducts: (page, perPage, keyword, category) => dispatch(fetchProducts(page, perPage, keyword, category)),
    fetchCategories: () => dispatch(fetchCategories()),
    fetchVendors: () => dispatch(fetchVendors()),
    addImportBill: (data) => dispatch(addImportBill(data)),
    reset: () => dispatch(reset())
  };
}

export default connect(mapState, mapDispatchToProps)(ImportBillForm);
