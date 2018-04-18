import React, { Component } from 'react';
import { Form, Grid, Button } from 'semantic-ui-react';
import { Field, reduxForm,reset } from 'redux-form';
import classnames from 'classnames';

class RoomForm extends Component {

  renderField = ({ input, label, type, meta: { touched, error } }) => (
    <Form.Field className={classnames({error:touched && error})}>
      <label>{label}</label>
      <input {...input} placeholder={label} type={type}/>
      {touched && error && <span className="error">{error.message}</span>}
    </Form.Field>
  )

  selectField = ({ input, label, type, list, meta: { touched, error } }) => (
    <Form.Field className={classnames({error:touched && error})}>
      <label>{label}</label>
      <select {...input} placeholder={label} style={{height:'37px'}}>
        <option value={'x'}>Select Office</option>
        {list}
      </select>
      {touched && error && <span className="error">{error.message}</span>}
    </Form.Field>
  )

  render() {
    const { handleSubmit, pristine, submitting, loading } = this.props;
    let selectOfficeList = this.props.offices.map((office,i) => {
      return (
        <option key={office.name} value={i}>{office.name}</option>
      )
    })
    return (
      <Grid centered columns={1}>
        <Grid.Column>
          <h1 style={{marginTop:"1em"}}>Create Meeting Room</h1>
          <Form onSubmit={handleSubmit} loading={loading}>
            <Field name="name" type="text" component={this.renderField} label="Name"/>
            <Field name="size" type="number" component={this.renderField} label="Size (in sqr)"/>
            <Field name="floor" type="number" component={this.renderField} label="Floor"/>
            <Field name="capacity" type="number" component={this.renderField} label="Capacity"/>
            <Field name="id" label="Select Office" component={this.selectField} list={selectOfficeList}/>
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
  if(!values.size) {
    errors.size = {
      message: 'You need to provide the size'
    }
  }
  if(!values.floor) {
    errors.floor = {
      message: 'You need to provide the floor'
    }
  }
  if(!values.capacity) {
    errors.capacity = {
      message: 'You need to provide the capacity'
    }
  }
  if(!values.id || values.id==='x') {
    errors.id = {
      message: 'You need to provide the office'
    }
  }
  return errors;
}
const afterSubmit = (result, dispatch) =>
  dispatch(reset('room'));

export default reduxForm({form:'room',validate,onSubmitSuccess: afterSubmit})(RoomForm);
