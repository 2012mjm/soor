import {createAction} from 'redux-act'

export const setInvoiceList = createAction('SET_INVOICE_LIST', data => data)
export const setCurrentInvoice = createAction('SET_CURRENT_INVOICE', data => data)
