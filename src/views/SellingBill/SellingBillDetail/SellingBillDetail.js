import React from "react";
// react-redux components
import { connect } from 'react-redux';
import { fetchSellingBillDetail, updateSellingBillStatus, reset } from './SellingBillDetailAction';
// react-router-doom components
import { generatePath } from "react-router";

// core components
import SellingBillDetail from "./SellingBillDetailView.jsx";


class BillDetail extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
        sellingBillDetails: props.sellingBillDetail,
    };
  }

  componentDidMount() {
    console.log('run to here');
    this.props.fetchSellingBillDetail(this.props.sellingBillDetails);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      fetching: nextProps.fetching,
      fetched: nextProps.fetched,
      sellingBillDetails: nextProps.sellingBillDetails,
      fetchSellingBillDetail: (id) => nextProps.fetchSellingBillDetail(id),
      updateSellingBillStatus: (id) => nextProps.updateSellingBillStatus(id),
      reset: () => nextProps.reset(),
      error: nextProps.error
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
    console.log('run render aaaaaaaaaaaaaaaaaaaaaaaa');
    return (
      <SellingBillDetail
        fetched={this.state.fetched}
        sellingBillDetails={this.state.sellingBillDetails}
        handleSubmit={e => this.handleSubmit(e)}
      />
    );
  }
}


const mapState = state => ({
  fetching: state.sellingBillDetail.fetching,
  fetched: state.sellingBillDetail.fetched,
  sellingBillDetails: state.sellingBillDetail.sellingBillDetails,
  error: state.sellingBillDetail.error,
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSellingBillDetail: (id) => dispatch(fetchSellingBillDetail(id)),
    reset: () => dispatch(reset())
  };
}

export default connect(mapState, mapDispatchToProps)(SellingBillDetail);
