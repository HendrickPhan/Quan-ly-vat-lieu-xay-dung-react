import React from "react";
// react-redux components
import { connect } from 'react-redux';
import { fetchProducts, fetchCategories, reset } from './SellingBillFormActions';
import { fetchCategorySelectList } from '../../Category/CategoryForm/CategoryFormActions';
// react-router-doom components
import { generatePath } from "react-router";

// core components
//import SellingBillFormView from "./SellingBillFormView.jsx";


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
    console.log(this.state);
    this.props.fetchProducts(1,1,'','');
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
      // <ProductFormView
      //   fetched={this.state.fetched}
      //   product={this.state.product}
      //   deleteImages={this.state.deleteImages}
      //   categorySelectList={this.props.categorySelectList}
      //   handleSubmit={e => this.handleSubmit(e)}
      //   handleInputChange={e => this.handleInputChange(e)}
      //   handleCategorySelectChange={e => this.handleCategorySelectChange(e)}
      //   handleImagesChange={this.handleImagesChange}
      //   handleImageRestoreClick={this.handleImageRestoreClick}
      //   handleImageDeleteClick={this.handleImageDeleteClick}
      // />
      <div>
      </div>
    );
  }
}


const mapState = state => ({
  sellingBillDetail: state.sellingBillForm.sellingBillDetail, //[{product_id: , quantity: }]
  categories: state.sellingBillForm.categories,
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
