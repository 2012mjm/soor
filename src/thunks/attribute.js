import * as attributeActions from '../actions/attribute'
import * as ajaxActions from '../actions/ajax'
import { API_URL } from '../lib/constants'
import axios from 'axios'

export function attributeThunk () {
  return (dispatch, getState) => {
    dispatch(ajaxActions.isLoading(true))
    return axios.get(`${API_URL}attributes`).then((res) => {

      dispatch(ajaxActions.isLoading(false))
      dispatch(attributeActions.setAttributeList(res.data))
      return res.data
    }).catch((e) => {
      dispatch(ajaxActions.isLoading(false))
      throw e
    })
  }
}

export function updateAttributeThunk (values) {
  return (dispatch, getState) => {
    dispatch(ajaxActions.isLoading(true))
    return axios.put(`${API_URL}attribute`, values).then((res) => {

      dispatch(ajaxActions.isLoading(false))
      return res.data
    }).catch((e) => {
      dispatch(ajaxActions.isLoading(false))
      throw e
    })
  }
}

export function addAttributeThunk (values) {
  return (dispatch, getState) => {
    dispatch(ajaxActions.isLoading(true))
    return axios.post(`${API_URL}attribute`, values).then((res) => {

      dispatch(ajaxActions.isLoading(false))
      return res.data
    }).catch((e) => {
      dispatch(ajaxActions.isLoading(false))
      throw e
    })
  }
}

export function infoAttributeThunk (id) {
  return (dispatch, getState) => {
    dispatch(ajaxActions.isLoading(true))
    return axios.get(`${API_URL}attribute?id=${id}`).then((res) => {

      dispatch(attributeActions.setCurrentAttribute(res.data))
      dispatch(ajaxActions.isLoading(false))
      return res.data
    }).catch((e) => {
      dispatch(ajaxActions.isLoading(false))
      throw e
    })
  }
}

export function deleteAttributeThunk (id) {
  return (dispatch, getState) => {
    dispatch(ajaxActions.isLoading(true))
    return axios.delete(`${API_URL}attribute?id=${id}`).then((res) => {

      dispatch(ajaxActions.isLoading(false))
      return res.data
    }).catch((e) => {
      dispatch(ajaxActions.isLoading(false))
      throw e
    })
  }
}

export function addValueAttributeThunk (values) {
  return (dispatch, getState) => {
    dispatch(ajaxActions.isLoading(true))
    return axios.post(`${API_URL}attribute/value`, values).then((res) => {

      dispatch(ajaxActions.isLoading(false))
      return res.data
    }).catch((e) => {
      dispatch(ajaxActions.isLoading(false))
      throw e
    })
  }
}