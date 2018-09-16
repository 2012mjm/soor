import * as authActions from '../actions/auth'
import * as ajaxActions from '../actions/ajax'
import { API_URL } from '../lib/constants'
import axios from 'axios'
import { setAuthorizationToken } from '../lib/utils'
import jwt from 'jsonwebtoken'

export function storeLoginThunk (userData) {
  return (dispatch, getState) => {
    dispatch(ajaxActions.isLoading(true))
    return axios.post(`${API_URL}store/login`, userData).then((res) => {
      
      const tokenDecode = jwt.decode(res.data.token)
      res.data.role = tokenDecode.role

      dispatch(ajaxActions.isLoading(false))
      dispatch(authActions.loggedIn(res.data))

      window.localStorage.setItem('auth', JSON.stringify(res.data))
      setAuthorizationToken(res.data.token)
      return res.data
    }).catch((e) => {
      dispatch(ajaxActions.isLoading(false))
      throw e
    })
  }
}

export function managerLoginThunk (userData) {
  return (dispatch, getState) => {
    dispatch(ajaxActions.isLoading(true))
    return axios.post(`${API_URL}manager/login`, userData).then((res) => {
      
      const tokenDecode = jwt.decode(res.data.token)
      res.data.role = tokenDecode.role

      dispatch(ajaxActions.isLoading(false))
      dispatch(authActions.loggedIn(res.data))

      window.localStorage.setItem('auth', JSON.stringify(res.data))
      setAuthorizationToken(res.data.token)
      return res.data
    }).catch((e) => {
      dispatch(ajaxActions.isLoading(false))
      throw e
    })
  }
}

export function getCurrentUserThunk () {
  return (dispatch, getState) => {
    dispatch(ajaxActions.isLoading(true))
    const currentUserId = getState().auth.id

    return axios.get(`${API_URL}users/${currentUserId}`).then((res) => {
      dispatch(ajaxActions.isLoading(false))
      // const data = transformUserDetails({...res.data.data,
      //   permissions: getState().auth.permissions,
      //   role: getState().auth.role
      // })
      dispatch(authActions.setCurrentUser(res.data.data))
      return res.data.data
    }).catch((e) => {
      dispatch(ajaxActions.isLoading(false))
      throw e
    })
  }
}

export function customerLoginThunk (userData) {
  return (dispatch, getState) => {
    dispatch(ajaxActions.isLoading(true))
    return axios.post(`${API_URL}customer/login`, userData).then((res) => {

      dispatch(ajaxActions.isLoading(false))
      return res.data
    }).catch((e) => {
      dispatch(ajaxActions.isLoading(false))
      throw e
    })
  }
}

export function customerVerifyThunk (userData) {
  return (dispatch, getState) => {
    dispatch(ajaxActions.isLoading(true))
    return axios.post(`${API_URL}customer/verify-code`, userData).then((res) => {
      
      const tokenDecode = jwt.decode(res.data.token)
      res.data.role = tokenDecode.role

      dispatch(ajaxActions.isLoading(false))
      dispatch(authActions.loggedIn(res.data))

      window.localStorage.setItem('auth', JSON.stringify(res.data))
      setAuthorizationToken(res.data.token)
      return res.data
    }).catch((e) => {
      dispatch(ajaxActions.isLoading(false))
      throw e
    })
  }
}
