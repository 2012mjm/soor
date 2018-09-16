import {createAction} from 'redux-act'

export const loggedIn = createAction('USER_LOGGED_IN', data => data)
export const setCurrentUser = createAction('SET_CURRENT_USER', data => data)
export const logout = createAction('USER_LOG_OUT')
