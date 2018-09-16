import {createReducer} from 'redux-act'
import * as ajaxActions from '../actions/ajax'

export default createReducer({
  [ajaxActions.isLoading]: (state, payload) => ({...state, isLoading: payload}),
  [ajaxActions.hasErrored]: (state, payload) => ({...state, hasErrored: payload})
}, {
  isLoading: false,
  hasErrored: false
})
