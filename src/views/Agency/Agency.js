import React from "react";
// @material-ui/core components
// react-redux components
import { connect } from 'react-redux';
import { fetchAgencies, changePerPage, deleteAgency } from './AgencyActions';
// react-router-doom components
import { withRouter } from "react-router-dom";
// core components
import AgencyView from "./AgencyView.jsx"

class Agency extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      perPage:props.perPage,
      totalRows:props.totalRows,
      currentPage:props.currentPage,
      changePerPage:(value) => props.changePerPage(value),
      fetchAgencies:(currentPage, perPage) => props.fetchAgencies(currentPage, perPage),
      agencies:props.agencies
    };
  }

  componentDidMount() {
    this.state.fetchAgencies(this.state.currentPage, this.state.perPage);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      perPage: nextProps.perPage,
      totalRows: nextProps.totalRows,
      currentPage: nextProps.currentPage,
      changePerPage: (value) => nextProps.changePerPage(value),
      fetchAgencies: (currentPage, perPage) => nextProps.fetchAgencies(currentPage, perPage),
      agencies: nextProps.agencies
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
    let conf = window.confirm(`Xóa agency với id là ${id} ?`)
    if (conf){
      this.props.deleteAgency(id).then(
        () => this.state.fetchAgencies(this.state.currentPage, this.state.perPage)
      );
    }
  }


  render() {
    if (this.props.error) {
      alert(this.props.error);
    }

    
    return (
      <AgencyView
        perPage={this.state.perPage}
        totalRows={this.state.totalRows}
        currentPage={this.state.currentPage}
        changePerPage={ (value) => this.state.changePerPage(value) }
        fetchAgencies={ (currentPage, perPage) => this.state.fetchAgencies(currentPage, perPage) }
        agencies={this.state.agencies}
        onEditClickHandle={(id)=>this.onEditClickHandle(id)}
        onAddClickHandle={()=>this.onAddClickHandle()}
        onDeleteClickHandle={(id)=>this.onDeleteClickHandle(id)}
      />
     
    );
  }
}

const mapState = state => ({
  fetching: state.agency.fetching,
  fetched: state.agency.fetched,
  agencies: state.agency.agencies,
  currentPage: state.agency.currentPage,
  totalRows: state.agency.totalRows,
  perPage: state.agency.perPage,
  error: state.agency.error
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAgencies: (page, perPage) => dispatch(fetchAgencies(page, perPage)),
    changePerPage: (perPage) => dispatch(changePerPage(perPage)),
    deleteAgency: (id) => dispatch(deleteAgency(id))
  };
}

export default connect(mapState, mapDispatchToProps)(Agency);
