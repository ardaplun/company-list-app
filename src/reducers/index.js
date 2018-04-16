import { combineReducers } from 'redux';
import CompanyReducers from './company-reducer';
import { reducer as formReducer } from 'redux-form';

const reducers = {
  companiesStore: CompanyReducers,
  form:formReducer
}

const rootReducer = combineReducers(reducers);

export default rootReducer;
