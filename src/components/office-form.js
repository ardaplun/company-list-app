import React, { Component } from 'react';
import { Form, Grid, Button } from 'semantic-ui-react';
import { Field, reduxForm,reset } from 'redux-form';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import classnames from 'classnames';
import moment from 'moment'
import momentLocalizer from 'react-widgets-moment';
import 'react-widgets/dist/css/react-widgets.css'

moment.locale('id')
momentLocalizer()

class OfficeForm extends Component {

  renderField = ({ input, label, type, meta: { touched, error } }) => (
    <Form.Field className={classnames({error:touched && error})}>
      <label>{label}</label>
      <input {...input} placeholder={label} type={type}/>
      {touched && error && <span className="error">{error.message}</span>}
    </Form.Field>
  )

  locationField = ({ input, label, type, min, meta: { touched, error } }) => (
    <Form.Field className={classnames({error:touched && error})}>
      <input {...input} placeholder={label} type={type} min={min}/>
      {touched && error && <span className="error">{error.message}</span>}
    </Form.Field>
  )
  selectField = ({ input, label, type, list, meta: { touched, error } }) => (
    <Form.Field className={classnames({error:touched && error})}>
      <label>{label}</label>
      <select {...input} placeholder={label} style={{height:'37px'}}>
        <option value={0}>Select Company</option>
        {list}
      </select>
      {touched && error && <span className="error">{error.message}</span>}
    </Form.Field>
  )
  renderDateTimePicker = ({ label, input: { onChange, value }, showTime, meta: { touched, error } }) =>
  <Form.Field className={classnames({error:touched && error})}>
    <label>{label}</label>
      <DateTimePicker
        onChange={onChange}
        format="DD MMM YYYY"
        time={showTime}
        value={!value ? null : new Date(value)}
      />
    {touched && error && <span className="error">{error.message}</span>}
  </Form.Field>

  render() {
    const { handleSubmit, pristine, submitting, loading } = this.props;
    let selectCompanyList = this.props.companies.map(company => {
      return (
        <option key={company._id} value={company._id}>{company.name}</option>
      )
    })
    return (
      <Grid centered columns={1}>
        <Grid.Column>
          <h1 style={{marginTop:"1em"}}>Create Office</h1>
          <Form onSubmit={handleSubmit} loading={loading}>
            <Field name="name" type="text" component={this.renderField} label="Name"/>
            <div className='field'><label>Location</label>
              <Form.Group width='equal'>
                <Field name="lat" type="number" component={this.locationField} label="Latitude" min={1}/>
                <Field name="lng" type="number" component={this.locationField} label="Longitude" min={1}/>
              </Form.Group>
            </div>
            <Field name="startDate" showTime={false}
                   component={this.renderDateTimePicker}
                   label="Office Start Date"/>
            <Field name="_id" label="Select Company" component={this.selectField} list={selectCompanyList}/>
            <Button fluid primary type='submit' disabled={pristine || submitting}>Create</Button>
          </Form>
        </Grid.Column>
      </Grid>
    )
  }
}

const validate = (values) => {
  const errors = {};
  if(!values.name) {
    errors.name = {
      message: 'You need to provide a name'
    }
  }
  if(!values.lat) {
    errors.lat = {
      message: 'You need to provide the latitude'
    }
  }
  if(!values.lng) {
    errors.lng = {
      message: 'You need to provide the longitude'
    }
  }
  if(!values.startDate) {
    errors.startDate = {
      message: 'You need to provide the start date'
    }
  }
  if(!values._id || values._id==='0') {
    errors._id = {
      message: 'You need to provide the company'
    }
  }
  return errors;
}
const afterSubmit = (result, dispatch) =>
  dispatch(reset('office'));

export default reduxForm({form:'office',validate,onSubmitSuccess: afterSubmit})(OfficeForm);
