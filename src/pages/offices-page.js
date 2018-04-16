import React, { Component} from 'react';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import CompanyDetails from '../components/company-details';
import OfficeList from '../components/office-list';
import ModalConfim from '../components/modal-confirm';
import { fetchCompany, deleteOffice } from '../actions/company-actions';

class OfficePage extends Component {
  constructor(props){
    super(props)
    this.state = {open:false,deleteData:[]}
    this._deleteOffice = this._deleteOffice.bind(this)
    this._confirm = this._confirm.bind(this)
  }

  componentWillMount() {
    this.props.fetchCompany(this.props.match.params);
  }

  _deleteOffice(e){
    this.setState({deleteData:e, open:true})
  }

  _confirm(e){
    if(!e){
      this.setState({open:false})
    }else{
      this.props.deleteOffice(this.state.deleteData)
      .then(response =>{
        toast.success("Success!", {
        position: toast.POSITION.TOP_RIGHT})
        this.setState({open:false})
      })
      .catch(err => {
        toast.danger("Error!", {
        position: toast.POSITION.TOP_RIGHT})
        this.setState({open:false})
       })
    }
  }

  _modalShow(){
    return this
  }

  render() {
    let offices = this.props.company.offices ? this.props.company.offices : []
    return (
      <div className='App'>
        <div className='App-content'>
          <div style={{flex:1}}>
            <CompanyDetails company={this.props.company}
              history={this.props.history}/>
          </div>
          <div style={{flex:1, padding:'20px'}}>
            <h1>Offices</h1>
            <OfficeList offices={offices} company={this.props.company} deleteOffice={this._deleteOffice}
            />
            <br/>
          </div>
        </div>
        <ModalConfim open={this.state.open} confirm={this._confirm}/>
        <ToastContainer autoClose={2000}/>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
      company : state.companiesStore.company,
      errors: state.companiesStore.errors
  }
}
export default connect(mapStateToProps, { fetchCompany, deleteOffice })(OfficePage);
