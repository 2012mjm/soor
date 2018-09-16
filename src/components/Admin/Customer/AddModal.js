import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Button } from 'antd'
import { notifySuccess, notifyError } from '../../../lib/notification'
import { errorHandler } from '../../../lib/utils'
import { addCustomerThunk } from '../../../thunks/customer'
import FormerInfo from './FormerInfo'

class AddModal extends React.Component {
  constructor (props) {
    super(props)
    this.create = this.create.bind(this)
  }

  create = (e, form, id=null) => {
    e.preventDefault()
    form.validateFields((err, values) => {
      if (err) return undefined

      this.props.dispatch(addCustomerThunk(values)).then(res => {
        notifySuccess('حساب مشتری جدید با موفقیت ایجاد شد.')
        this.props.reloadList()
        form.resetFields()
        this.props.viewer(false)
        return true
      }).catch(e => {
        notifyError(errorHandler(e))
        return false
      })
    })
  }

  render () {
    return (
      <Modal
        destroyOnClose
        title="ساخت حساب مشتری جدید"
        visible={this.props.show}
        onCancel={() => this.props.viewer(false)}
        footer={<Button onClick={() => this.props.viewer(false)}>بستن</Button>}>
          <FormerInfo onSubmit={this.create} dispatch={this.props.dispatch} />
      </Modal>
    )
  }
}

AddModal.propTypes = {
  show: PropTypes.bool,
  viewer: PropTypes.func,
  dispatch: PropTypes.func,
  reloadList: PropTypes.func,
}

export default AddModal
