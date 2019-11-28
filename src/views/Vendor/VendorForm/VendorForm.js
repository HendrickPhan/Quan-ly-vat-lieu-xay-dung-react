import React from "react";
// react-redux components
import { connect } from 'react-redux';
import { fetchVendor, editVendor, addVendor, reset } from './VendorFormActions';
// react-router-doom components
import { generatePath } from "react-router";

// core components
import VendorFormView from "./VendorFromView.jsx";


class VendorForm extends React.Component {

  constructor(props) {
    super(props);

    // reset login status
    // this.props.logout();

    this.state = {
      vendor: {
        id: null,
        name: '',
        address: '',
        phone: '',
        email: ''
      },
    };
  }


  handleChange(e) {
    const { name, value } = e.target;
    this.setState(prevState => ({
      vendor: {
        ...prevState.vendor,
        [name]: value
      }
    }));
  }

  handleSubmit(e) {
    e.preventDefault();
    let data = (({ name, address, phone, email }) => ({ name, address, phone, email }))(this.state.vendor);
    
    if(this.state.vendor.id){
      this.props.editVendor(this.state.vendor.id, data);
    } 
    else {
      const { history } = this.props;
      this.props.addVendor(data).then( vendor => {
        history.push({
          pathname: generatePath(this.props.match.path, {id: vendor.id})
        });
        this.props.fetchVendor(vendor.id);

      }); 
    } 
  }


  componentDidMount() {
    if (this.props.match.params.id != 'add') {
      this.props.fetchVendor(this.props.match.params.id);
    }
    else{
      this.props.reset();
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      fetching: nextProps.fetching,
      fetched: nextProps.fetched,
      vendor: nextProps.vendor,
      fetchVendor: (id) => nextProps.fetchVendor(id),
      editVendor: (id, data) => nextProps.editVendor(id, data),
      addVendor: (data) => nextProps.addVendor(data),
      reset: () =>  nextProps.reset(),
      error: nextProps.error
    });
    console.log(this.state)
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
      <VendorFormView
        fetched={this.state.fetched}
        vendor={this.state.vendor}
        vendorSelectList={this.props.vendorSelectList}
        handleChange={(e) => this.handleChange(e)}
        handleSubmit={(e) => this.handleSubmit(e)}
      />
    );
  }
}


const mapState = state => ({
  fetching: state.vendorForm.fetching,
  fetched: state.vendorForm.fetched,
  vendor: state.vendorForm.vendor,
  error: state.vendorForm.error
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchVendor: (id) => dispatch(fetchVendor(id)),
    editVendor: (id, data) => dispatch(editVendor(id, data)),
    addVendor: (data) => dispatch(addVendor(data)),
    reset: () => dispatch(reset())
  };
}

export default connect(mapState, mapDispatchToProps)(VendorForm);
