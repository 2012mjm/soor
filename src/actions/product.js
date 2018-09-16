import {createAction} from 'redux-act'

export const setProductList = createAction('SET_PRODUCT_LIST', data => data)
export const setCurrentProduct = createAction('SET_CURRENT_PRODUCT', data => data)
