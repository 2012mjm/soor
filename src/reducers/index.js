import ajaxReducer from './ajaxReducer'
import authReducer from './authReducer'

import { combineReducers } from 'redux'

export default combineReducers({
  ajax: ajaxReducer,
  auth: authReducer,
})
