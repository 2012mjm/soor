import { createReducer } from 'redux-act'
import * as productActions from '../actions/product'

export default createReducer({
  [productActions.setProductList]: (state, payload) => ({...state, list: payload}),
  [productActions.setCurrentProduct]: (state, payload) => ({...state, current: payload})
}, {
  list: [],
  current: {
    id: null
  }
})
