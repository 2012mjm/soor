import { notification } from 'antd'

export function notifySuccess (message, placement = 'bottomLeft') {
  return notification.success({
    message: message,
    placement: placement
  })
}

export function notifyError (message, placement = 'bottomLeft') {
  return notification.error({
    message: message,
    placement: placement
  })
}

export function notifyWarning (message, placement = 'bottomLeft') {
  return notification.warning({
    message: message,
    placement: placement
  })
}
