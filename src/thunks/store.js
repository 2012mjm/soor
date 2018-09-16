import * as authActions from '../actions/auth'
import * as ajaxActions from '../actions/ajax'
import * as storeActions from '../actions/store'
import { API_URL } from '../lib/constants'
import axios from 'axios'
import { setAuthorizationToken } from '../lib/utils'
import jwt from 'jsonwebtoken'

export function storeSignupThunk (data) {
  return (dispatch, getState) => {
    dispatch(ajaxActions.isLoading(true))
    return axios.post(`${API_URL}store/signup`, data).then((res) => {
      
      const tokenDecode = jwt.decode(res.data.token)
      res.data.isAdmin = tokenDecode.isAdmin

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

export function storeThunk (page=1, count=10) {
  return (dispatch, getState) => {
    dispatch(ajaxActions.isLoading(true))
    return axios.get(`${API_URL}stores/panel?page=${page}&count=${count}`).then((res) => {

      dispatch(ajaxActions.isLoading(false))
      dispatch(storeActions.setStoreList(res.data))
      return res.data
    }).catch((e) => {
      dispatch(ajaxActions.isLoading(false))
      throw e
    })
  }
}

export function addStoreThunk (data) {
  return (dispatch, getState) => {
    dispatch(ajaxActions.isLoading(true))
    return axios.post(`${API_URL}store/signup`, data).then((res) => {

      dispatch(ajaxActions.isLoading(false))
      return res.data
    }).catch((e) => {
      dispatch(ajaxActions.isLoading(false))
      throw e
    })
  }
}

export function updateStoreThunk (values) {
  return (dispatch, getState) => {
    dispatch(ajaxActions.isLoading(true))
    return axios.put(`${API_URL}store`, values).then((res) => {

      dispatch(ajaxActions.isLoading(false))
      return res.data
    }).catch((e) => {
      dispatch(ajaxActions.isLoading(false))
      throw e
    })
  }
}

export function deleteStoreThunk (id) {
  return (dispatch, getState) => {
    dispatch(ajaxActions.isLoading(true))
    return axios.delete(`${API_URL}store?id=${id}`).then((res) => {

      dispatch(ajaxActions.isLoading(false))
      return res.data
    }).catch((e) => {
      dispatch(ajaxActions.isLoading(false))
      throw e
    })
  }
}

export function infoStoreThunk (id=null) {
  return (dispatch, getState) => {
    dispatch(ajaxActions.isLoading(true))
    return axios.get(`${API_URL}store/panel?id=${id}`).then((res) => {

      dispatch(storeActions.setCurrentStore(res.data))
      dispatch(ajaxActions.isLoading(false))
      return res.data
    }).catch((e) => {
      dispatch(ajaxActions.isLoading(false))
      throw e
    })
  }
}