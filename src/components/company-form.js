import React, { Component } from 'react';
import { Form, Grid, Button } from 'semantic-ui-react';
import { Field, reduxForm,reset } from 'redux-form';
import classnames from 'classnames';

class CompanyForm extends Component {

  renderField = ({ input, label, type, meta: { touched, error } }) => (
    <Form.Field className={classnames({error:touched && error})}>
      <label>{label}</label>
      <input {...input} placeholder={label} type={type}/>
      {touched && error && <span className="error">{error.message}</span>}
    </Form.Field>
  )

  phoneField = ({ input, label, type, min, meta: { touched, error } }) => (
    <Form.Field className={classnames({error:touched && error})}>
      <input {...input} placeholder={label} type={type} min={min}/>
      {touched && error && <span className="error">{error.message}</span>}
    </Form.Field>
  )

  render() {
    const { handleSubmit, pristine, submitting, loading } = this.props;
    return (
      <Grid centered columns={1}>
        <Grid.Column>
          <h1 style={{marginTop:"1em"}}>Create Company</h1>
          <Form onSubmit={handleSubmit} loading={loading}>
            <Field name="name" type="text" component={this.renderField} label="Name"/>
            <Field name="address" type="text" component={this.renderField} label="Address"/>
            <Field name="revenue" type="number" component={this.renderField} label="Revenue"/>
            <div className='field'><label>Phone No.</label>
              <Form.Group>
                <div style={{flex:2,margin:'0px 6px'}}>
                  <Field name="phoneCode" type="number" component={this.phoneField} label="Code" min={1}/>
                </div>
                <div style={{flex:6,margin:'0px 6px'}}>
                  <Field name="phoneNum" type="number" component={this.phoneField} label="Number" min={1}/>
                </div>
              </Form.Group>
            </div>
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
  if(!values.address) {
    errors.address = {
      message: 'You need to provide an address'
    }
  }
  if(!values.revenue) {
    errors.revenue = {
      message: 'You need to provide an revenue'
    }
  }
  if(!values.phoneCode) {
    errors.phoneCode = {
      message: 'You need to provide an phone code'
    }
  }
  if(!values.phoneNum) {
    errors.phoneNum = {
      message: 'You need to provide an phone number'
    }
  } else if(!/^[0-9]{6,14}$/.test(values.phoneNum)) {
    errors.phoneNum = {
      message: 'Phone number must be in 6-14 length '
    }
  }
  return errors;
}
const afterSubmit = (result, dispatch) =>
  dispatch(reset('company'));

export default reduxForm({form:'company',validate,onSubmitSuccess: afterSubmit})(CompanyForm);
