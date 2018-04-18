import React, { Component} from 'react';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import OfficeDetails from '../components/office-details';
import RoomList from '../components/room-list';
import ModalConfim from '../components/modal-confirm';
import { fetchCompany, deleteRoom } from '../actions/company-actions';

class RoomsPage extends Component {
  constructor(props){
    super(props)
    this.state = {open:false,deleteData:[]}
    this._deleteRoom = this._deleteRoom.bind(this)
    this._confirm = this._confirm.bind(this)
  }

  componentWillMount() {
    this.props.fetchCompany(this.props.match.params);
  }

  _deleteRoom(e){
    this.setState({deleteData:e, open:true})
  }

  _confirm(e){
    if(!e){
      this.setState({open:false})
    }else{
      this.props.deleteRoom(this.state.deleteData)
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
    let index = this.props.match.params._office
    if(Object.keys(this.props.company).length === 0) return (<h3>Loading...</h3>)
    let rooms = this.props.company.offices[index].rooms
    let office= this.props.company.offices[index]
    return (
      <div className='App'>
        <div className='App-content'>
          <div style={{flex:1}}>
            <OfficeDetails office={office}
              history={this.props.history}/>
          </div>
          <div style={{flex:1, padding:'20px'}}>
            <h1>Rooms</h1>
            <RoomList rooms={rooms} company={this.props.company} deleteRoom={this._deleteRoom} i={index}
              history={this.props.history}
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
export default connect(mapStateToProps, { fetchCompany, deleteRoom })(RoomsPage);
