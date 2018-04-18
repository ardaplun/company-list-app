const defaultState = {
  companies: [],
  company: {},
  loading: false,
  errors: {}
}

export default (state=defaultState, action={}) => {
  switch (action.type) {
    case 'FETCH_COMPANIES': {
      return {
        ...state,
        companies: action.payload
      }
    }
    case "FETCH_COMPANIES_FULFILLED": {
      return {
        ...state,
        companies: action.payload.data.data || action.payload.data // in case pagination is disabled
      }
    }
    case 'NEW_COMPANY': {
      return {
        ...state,
        company: {}
      }
    }

    case 'SAVE_COMPANY_PENDING': {
      return {
        ...state,
        loading: true
      }
    }

    case 'SAVE_COMPANY_FULFILLED': {
      return {
        ...state,
        companies: [...state.companies, action.payload.data],
        errors: {},
        loading: false
      }
    }

    case 'SAVE_COMPANY_REJECTED': {
      const data = action.payload.response.data;
      // convert feathers error formatting to match client-side error formatting
      const { name, address, revenue, phoneCode, phoneNum } = data.errors;
      const errors = { global: data.message, name, address, revenue, phoneCode, phoneNum, offices:[] };
      return {
        ...state,
        errors: errors,
        loading: false
      }
    }

    case 'FETCH_COMPANY_PENDING': {
      return {
        ...state,
        loading: true,
        company: {}
      }
    }

    case 'FETCH_COMPANY_FULFILLED': {
      return {
        ...state,
        company: action.payload.data,
        errors: {},
        loading: false
      }
    }

    case 'UPDATE_COMPANY_PENDING': {
      return {
        ...state,
        loading: true
      }
    }

    case 'UPDATE_COMPANY_FULFILLED': {
      const company = action.payload.data;
      console.log(company);
      return {
        ...state,
        companies: state.companies.map(item => item._id === company._id ? company : item),
        errors: {},
        loading: false
      }
    }
    case 'DELETE_COMPANY_FULFILLED': {
      const _id = action.payload.data._id;
      return {
        ...state,
        companies: state.companies.filter(item => item._id !== _id)
      }
    }
    case 'DELETE_OFFICE_FULFILLED': {
      const company = action.payload.data;
      return {
        ...state,
        companies: state.companies.map(item => item._id === company._id ? company : item),
        errors: {},
        loading: false
      }
    }
    case 'DELETE_ROOM_FULFILLED': {
      const company = action.payload.data;
      console.log(company);
      return {
        ...state,
        companies: state.companies.map(item => item._id === company._id ? company : item),
        errors: {},
        loading: false
      }
    }
    case 'UPDATE_COMPANY_REJECTED': {
      const data = action.payload.response.data;
      const { name, address, revenue, phoneCode, phoneNum } = data.errors;
      const errors = { global: data.message, name, address, revenue, phoneCode, phoneNum, offices:[] };
      return {
        ...state,
        errors: errors,
        loading: false
      }
    }
    default:
      return state;
  }
}
