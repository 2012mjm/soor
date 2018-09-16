import * as productActions from '../actions/product'
import * as ajaxActions from '../actions/ajax'
import { API_URL } from '../lib/constants'
import axios from 'axios'

export function productThunk (page=1, count=10) {
  return (dispatch, getState) => {
    dispatch(ajaxActions.isLoading(true))
    return axios.get(`${API_URL}products/panel?page=${page}&count=${count}`).then((res) => {

      dispatch(ajaxActions.isLoading(false))
      dispatch(productActions.setProductList(res.data))
      return res.data
    }).catch((e) => {
      dispatch(ajaxActions.isLoading(false))
      throw e
    })
  }
}

export function updateProductThunk (values) {
  return (dispatch, getState) => {
    dispatch(ajaxActions.isLoading(true))
    return axios.put(`${API_URL}product`, values).then((res) => {

      dispatch(ajaxActions.isLoading(false))
      return res.data
    }).catch((e) => {
      dispatch(ajaxActions.isLoading(false))
      throw e
    })
  }
}

export function addProductThunk (values) {
  return (dispatch, getState) => {
    dispatch(ajaxActions.isLoading(true))
    return axios.post(`${API_URL}product`, values).then((res) => {

      dispatch(ajaxActions.isLoading(false))
      return res.data
    }).catch((e) => {
      dispatch(ajaxActions.isLoading(false))
      throw e
    })
  }
}

export function infoProductThunk (id) {
  return (dispatch, getState) => {
    dispatch(ajaxActions.isLoading(true))
    return axios.get(`${API_URL}product/panel?id=${id}`).then((res) => {

      dispatch(productActions.setCurrentProduct(res.data))
      dispatch(ajaxActions.isLoading(false))
      return res.data
    }).catch((e) => {
      dispatch(ajaxActions.isLoading(false))
      throw e
    })
  }
}

export function deleteProductThunk (id) {
  return (dispatch, getState) => {
    dispatch(ajaxActions.isLoading(true))
    return axios.delete(`${API_URL}product?id=${id}`).then((res) => {

      dispatch(ajaxActions.isLoading(false))
      return res.data
    }).catch((e) => {
      dispatch(ajaxActions.isLoading(false))
      throw e
    })
  }
}

export function deleteProductPhotoThunk (id) {
  return (dispatch, getState) => {
    dispatch(ajaxActions.isLoading(true))
    return axios.delete(`${API_URL}product/photo?id=${id}`).then((res) => {

      dispatch(ajaxActions.isLoading(false))
      return res.data
    }).catch((e) => {
      dispatch(ajaxActions.isLoading(false))
      throw e
    })
  }
}

export function addProductAttributeThunk (values) {
  return (dispatch, getState) => {
    dispatch(ajaxActions.isLoading(true))
    return axios.post(`${API_URL}product/attribute`, values).then((res) => {

      dispatch(ajaxActions.isLoading(false))
      return res.data
    }).catch((e) => {
      dispatch(ajaxActions.isLoading(false))
      throw e
    })
  }
}