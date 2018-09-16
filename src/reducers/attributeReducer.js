import { createReducer } from 'redux-act'
import * as attributeActions from '../actions/attribute'

export default createReducer({
  [attributeActions.setAttributeList]: (state, payload) => ({...state, list: payload}),
  [attributeActions.setCurrentAttribute]: (state, payload) => ({...state, current: payload})
}, {
  list: [],
  current: {
    id: null
  }
})
