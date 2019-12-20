import React from "react";
// react-redux components
import { connect } from 'react-redux';
import { fetchProduct, editProduct, addProduct, reset } from './ProductFormActions';
import { fetchCategorySelectList } from '../../Category/CategoryForm/CategoryFormActions';
// react-router-doom components
import { generatePath } from "react-router";

// core components
import ProductFormView from "./ProductFormView.jsx";


class ProductForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      product: props.product,
      deleteImages: props.deleteImages
    };
  }

  componentDidMount() {
    if (this.props.match.params.id != 'add') {
      this.props.fetchProduct(this.props.match.params.id);
    }
    else {
      this.props.reset();
    }
    this.props.fetchCategorySelectList();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      fetching: nextProps.fetching,
      fetched: nextProps.fetched,
      product: nextProps.product,
      categorySelectList: nextProps.categorySelectList,
      fetchProduct: (id) => nextProps.fetchProduct(id),
      editProduct: (id, data) => nextProps.editProduct(id, data),
      addProduct: (id, data) => nextProps.addProduct(id, data),
      reset: () => nextProps.reset(),
      error: nextProps.error
    });
  }

  //------------------- event functions 
  handleSubmit(e) {
    e.preventDefault();
    let data = (({ name, price, unit, images, import_price }) => ({ name, price, unit, images, import_price }))(this.state.product);
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
      <ProductFormView
        fetched={this.state.fetched}
        product={this.state.product}
        deleteImages={this.state.deleteImages}
        categorySelectList={this.props.categorySelectList}
        handleSubmit={e => this.handleSubmit(e)}
        handleInputChange={e => this.handleInputChange(e)}
        handleCategorySelectChange={e => this.handleCategorySelectChange(e)}
        handleImagesChange={e => this.handleImagesChange(e)}
        handleImageRestoreClick={e => this.handleImageRestoreClick(e)}
        handleImageDeleteClick={e => this.handleImageDeleteClick(e)}
      />
    );
  }
}


const mapState = state => ({
  fetching: state.productForm.fetching,
  fetched: state.productForm.fetched,
  product: state.productForm.product,
  categorySelectList: state.categoryForm.categorySelectList,
  error: state.productForm.error,
  deleteImages: state.productForm.deleteImages
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProduct: (id) => dispatch(fetchProduct(id)),
    fetchCategorySelectList: () => dispatch(fetchCategorySelectList()),
    editProduct: (id, data) => dispatch(editProduct(id, data)),
    addProduct: (data) => dispatch(addProduct(data)),
    reset: () => dispatch(reset())

  };
}

export default connect(mapState, mapDispatchToProps)(ProductForm);
