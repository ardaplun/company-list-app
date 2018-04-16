import React, { Component} from 'react';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form';
import { ToastContainer, toast } from 'react-toastify';
import CompanyList from '../components/company-list';
import CompanyForm from '../components/company-form';
import OfficeForm from '../components/office-form';
import { newCompany, saveCompany, fetchCompanies, updateCompany, deleteCompany } from '../actions/company-actions';
import { Divider } from 'semantic-ui-react';
import moment from 'moment';
import ModalConfim from '../components/modal-confirm';
import 'react-toastify/dist/ReactToastify.css';


class Overview extends Component {
  constructor(props){
    super(props)
    this.state = {open:false,deleteData:[]}
    this._deleteCompany = this._deleteCompany.bind(this)
    this._confirm = this._confirm.bind(this)
  }

  componentWillMount() {
    this.props.fetchCompanies();
    this.props.newCompany();
  }
  _deleteCompany(e){
    this.setState({deleteData:e, open:true})
  }

  _confirm(e){
    if(!e){
      this.setState({open:false})
    }else{
      this.props.deleteCompany(this.state.deleteData)
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

  submitCompany = (company) => {
    return this.props.saveCompany(company)
      .then(response =>{
        toast.success("Success!", {
        position: toast.POSITION.TOP_RIGHT})
      })
      .catch(err => {
         throw new SubmissionError(this.props.errors)
       })
  }

  submitOffice = (office) => {
    office.startDate = moment(office.startDate).valueOf()
    let data = this.props.companies.find(dt=>dt._id === office._id)
    delete office._id
    data.offices.push(office)
    return this.props.updateCompany(data)
      .then(response =>{
        toast.success("Success!", {
        position: toast.POSITION.TOP_RIGHT})
      })
      .catch(err => {
         throw new SubmissionError(this.props.errors)
       })
  }

  render() {
    let companies = this.props.companies ? this.props.companies : []
    let companyList = this.props.companies.length > 0 ? (<CompanyList companies={this.props.companies}
      history={this.props.history} deleteCompany={this._deleteCompany}
    />) : <p>No company yet.</p>
    return (
        <div className='App'>
          <div className='App-content'>
            <div style={{flex:1, display:'flex'}}>
              <div style={{flex:1,padding:'20px',borderRight:'1px solid lightgrey'}}>
                <CompanyForm company={this.props.company}
                  loading={this.props.loading} onSubmit={this.submitCompany}
                />
              </div>
              <div style={{flex:1,padding:'20px'}}>
                <OfficeForm companies={companies} loading={this.props.loading}
                  onSubmit={this.submitOffice}
                />
              </div>
            </div>
            <Divider />
            <div style={{flex:1, padding:'20px'}}>
              <h1>Companies</h1>
              {companyList}
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
      companies : state.companiesStore.companies,
      errors: state.companiesStore.errors
  }
}

export default connect(mapStateToProps, { newCompany, saveCompany, fetchCompanies, updateCompany, deleteCompany })(Overview);
