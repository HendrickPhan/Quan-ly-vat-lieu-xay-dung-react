import React from "react";
// @material-ui/core components
// react-redux components
import { connect } from 'react-redux';
import { fetchVendors, changePerPage, deleteVendor } from './VendorActions';
// react-router-doom components
import { withRouter } from "react-router-dom";
// core components
import VendorView from "./VendorView.jsx"

class Vendor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      perPage:props.perPage,
      totalRows:props.totalRows,
      currentPage:props.currentPage,
      changePerPage:(value) => props.changePerPage(value),
      fetchVendors:(currentPage, perPage) => props.fetchVendors(currentPage, perPage),
      vendors:props.vendors
    };
  }

  componentDidMount() {
    this.state.fetchVendors(this.state.currentPage, this.state.perPage);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      perPage: nextProps.perPage,
      totalRows: nextProps.totalRows,
      currentPage: nextProps.currentPage,
      changePerPage: (value) => nextProps.changePerPage(value),
      fetchVendors: (currentPage, perPage) => nextProps.fetchVendors(currentPage, perPage),
      vendors: nextProps.vendors
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
    let conf = window.confirm(`Xóa vendor với id là ${id} ?`)
    if (conf){
      this.props.deleteVendor(id).then(
        () => this.state.fetchVendors(this.state.currentPage, this.state.perPage)
      );
    }
  }


  render() {
    if (this.props.error) {
      alert(this.props.error);
    }
    
    return (
      <VendorView
        perPage={this.state.perPage}
        totalRows={this.state.totalRows}
        currentPage={this.state.currentPage}
        changePerPage={ (value) => this.state.changePerPage(value) }
        fetchVendors={ (currentPage, perPage) => this.state.fetchVendors(currentPage, perPage) }
        vendors={this.state.vendors}
        onEditClickHandle={(id)=>this.onEditClickHandle(id)}
        onAddClickHandle={()=>this.onAddClickHandle()}
        onDeleteClickHandle={(id)=>this.onDeleteClickHandle(id)}
      />
     
    );
  }
}

const mapState = state => ({
  fetching: state.vendor.fetching,
  fetched: state.vendor.fetched,
  vendors: state.vendor.vendors,
  currentPage: state.vendor.currentPage,
  totalRows: state.vendor.totalRows,
  perPage: state.vendor.perPage,
  error: state.vendor.error
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchVendors: (page, perPage) => dispatch(fetchVendors(page, perPage)),
    changePerPage: (perPage) => dispatch(changePerPage(perPage)),
    deleteVendor: (id) => dispatch(deleteVendor(id))
  };
}

export default connect(mapState, mapDispatchToProps)(Vendor);
