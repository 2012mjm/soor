/* global FileReader */
import React from 'react'
import axios from 'axios'
import {Tooltip, Badge} from 'antd'

export function setAuthorizationToken (token) {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    delete axios.defaults.headers.common['Authorization']
  }
}

export function isUser (userRole, roleName) {
  return true
}

export function errorHandler (error) {
  if (error.response) {
    if (error.response.status >= 400 && error.response.status < 500) {

      if(error.response.data._errors !== undefined) {
        return error.response.data._errors[0]
      }

      if (typeof error.response.data === 'string') { return error.response.data }
      if (!error.response.data.message) { return error.response.data.error }
      if (typeof error.response.data.message === 'string') { return error.response.data.message }
      return 'خطایی در ارتباط با سرور وجود دارد'
    } else {
      return 'خطایی در ارتباط با سرور وجود دارد'
    }
  } else {
    return 'خطایی در ارتباط با سرور وجود دارد'
  }
}

export function getBase64 (file) {
  const reader = new FileReader()
  reader.readAsDataURL(file)
  return new Promise((resolve, reject) => {
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}

export function ellipse (text, maxLength=20, showTooltip=false) {
  if(!text) return null
  if(text.length <= maxLength) return text

  const trimmedString = text.substr(0, maxLength)
  let out = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")))

  if(text.length > out.length) out += ' ...'

  if(showTooltip) {
    return <Tooltip placement="top" title={text}>{out}</Tooltip>
  }
  return out
}

export function priceFormat (price, unit="تومان") {
  if(price <= 0) return 0
  return `${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} تومان`
}

export function statusStyle (status, text) {
  if(status === 'pending') return <span><Badge status="default" />{text}</span>
  if(status === 'accepted') return <span><Badge status="success" />{text}</span>
  if(status === 'rejected') return <span><Badge status="error" />{text}</span>
  return text
}

export function statusInvoiceStyle (status, text) {
  if(status === 'pending') return <span><Badge status="default" />{text}</span>
  if(status === 'paid') return <span><Badge status="processing" />{text}</span>
  if(status === 'sent') return <span><Badge status="warning" />{text}</span>
  if(status === 'sent-final') return <span><Badge status="success" />{text}</span>
  if(status === 'rejected') return <span><Badge status="error" />{text}</span>
  return text
}

export function statusOrderStyle (status, text) {
  if(status === 'pending') return <span><Badge status="processing" />{text}</span>
  if(status === 'sent') return <span><Badge status="success" />{text}</span>
  if(status === 'rejected') return <span><Badge status="error" />{text}</span>
  return text
}