import {createReducer} from 'redux-act'
import * as authActions from '../actions/auth'

export default createReducer({
  [authActions.loggedIn]: (state, payload) => ({...state,
    isAuthenticated: true,
    id: payload.id,
    token: payload.token,
    mobile: payload.mobile,
    username: payload.username,
    storeName: payload.store_name,
    isAdmin: payload.isAdmin,
    role: payload.role
  }),
  [authActions.logout]: (state) => {
    window.localStorage.removeItem('auth')
    return {...state, isAuthenticated: false}
  },
  [authActions.setCurrentUser]: (state, payload) => {
    return {...state, currentUser: payload}
  }
}, {
  isAuthenticated: false,
  id: null,
  token: null,
  mobile: null,
  username: null,
  currentUser: null,
  storeName: null,
  isAdmin: false,
  role: null
})
