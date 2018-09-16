import { createReducer } from 'redux-act'
import * as categoryActions from '../actions/category'

export default createReducer({
  [categoryActions.setCategoryList]: (state, payload) => ({...state, list: payload})
}, {
  list: []
})
