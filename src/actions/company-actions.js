import { client } from './';

const url = '/companies';

export function fetchCompanies(){
  return dispatch => {
    dispatch({
      type: 'FETCH_COMPANIES',
      payload: client.get(url)
    })
  }
}

export function fetchCompany(_id) {
  console.log(_id);
  return dispatch => {
    return dispatch({
      type: 'FETCH_COMPANY',
      payload: client.get(`${url}/${_id._id}`)
    })
  }
}

export function updateCompany(company) {
  console.log(company);
  return dispatch => {
    return dispatch({
      type: 'UPDATE_COMPANY',
      payload: client.put(`${url}/${company._id}`, company)
    })
  }
}

export function newCompany() {
  return dispatch => {
    dispatch({
      type: 'NEW_COMPANY'
    })
  }
}

export function saveCompany(company) {
  return dispatch => {
    return dispatch({
      type: 'SAVE_COMPANY',
      payload: client.post(url, company)
    })
  }
}
export function deleteCompany(_id) {
  return dispatch => {
    return dispatch({
      type: 'DELETE_COMPANY',
      payload: client.delete(`${url}/${_id}`)
    })
  }
}
export function deleteOffice(data) {
  const {company, i} = data
  company.offices.splice(i, 1);
  return dispatch => {
    return dispatch({
      type: 'DELETE_OFFICE',
      payload: client.put(`${url}/${company._id}`, company)
    })
  }
}
