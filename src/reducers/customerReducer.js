import { createReducer } from 'redux-act'
import * as customerActions from '../actions/customer'

export default createReducer({
  [customerActions.setCustomerList]: (state, payload) => ({...state, list: payload}),
  [customerActions.setCurrentCustomer]: (state, payload) => ({...state, current: payload})
}, {
  list: [],
  current: {
    id: null
  }
})
