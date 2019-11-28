import React from "react";
// react-redux components
import { connect } from 'react-redux';
import { fetchAgency, editAgency, addAgency, reset } from './AgencyFormActions';
// react-router-doom components
import { generatePath } from "react-router";

// core components
import AgencyFormView from "./AgencyFromView.jsx";


class AgencyForm extends React.Component {

  constructor(props) {
    super(props);

    // reset login status
    // this.props.logout();

    this.state = {
      agency: {
        id: null,
        name: '',
        address: '',
        phone: '',
      },
    };
  }


  handleChange(e) {
    const { name, value } = e.target;
    this.setState(prevState => ({
      agency: {
        ...prevState.agency,
        [name]: value
      }
    }));
  }

  handleSubmit(e) {
    e.preventDefault();
    let data = (({ name, address, phone }) => ({ name, address, phone }))(this.state.agency);
    
    if(this.state.agency.id){
      this.props.editAgency(this.state.agency.id, data);
    } 
    else {
      const { history } = this.props;
      this.props.addAgency(data).then( agency => {
        history.push({
          pathname: generatePath(this.props.match.path, {id: agency.id})
        });
        this.props.fetchAgency(agency.id);

      }); 
    } 
  }


  componentDidMount() {
    if (this.props.match.params.id != 'add') {
      this.props.fetchAgency(this.props.match.params.id);
    }
    else{
      this.props.reset();
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      fetching: nextProps.fetching,
      fetched: nextProps.fetched,
      agency: nextProps.agency,
      fetchAgency: (id) => nextProps.fetchAgency(id),
      editAgency: (id, data) => nextProps.editAgency(id, data),
      addAgency: (data) => nextProps.addAgency(data),
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
      <AgencyFormView
        fetched={this.state.fetched}
        agency={this.state.agency}
        agencySelectList={this.props.agencySelectList}
        handleChange={(e) => this.handleChange(e)}
        handleSubmit={(e) => this.handleSubmit(e)}
      />
    );
  }
}


const mapState = state => ({
  fetching: state.agencyForm.fetching,
  fetched: state.agencyForm.fetched,
  agency: state.agencyForm.agency,
  error: state.agencyForm.error
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAgency: (id) => dispatch(fetchAgency(id)),
    editAgency: (id, data) => dispatch(editAgency(id, data)),
    addAgency: (data) => dispatch(addAgency(data)),
    reset: () => dispatch(reset())
  };
}

export default connect(mapState, mapDispatchToProps)(AgencyForm);
