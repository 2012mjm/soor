import {createAction} from 'redux-act'

export const setCustomerList = createAction('SET_CUSTOMER_LIST', data => data)
export const setCurrentCustomer = createAction('SET_CURRENT_CUSTOMER', data => data)
