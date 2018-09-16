import { createReducer } from 'redux-act'
import * as storeActions from '../actions/store'

export default createReducer({
  [storeActions.setStoreList]: (state, payload) => ({...state, list: payload}),
  [storeActions.setCurrentStore]: (state, payload) => ({...state, current: payload})
}, {
  list: [],
  current: {
    id: null
  }
})