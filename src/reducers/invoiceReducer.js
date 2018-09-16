import { createReducer } from 'redux-act'
import * as invoiceActions from '../actions/invoice'

export default createReducer({
  [invoiceActions.setInvoiceList]: (state, payload) => ({...state, list: payload})
}, {
  list: []
})
