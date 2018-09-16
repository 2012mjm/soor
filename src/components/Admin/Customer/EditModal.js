import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Button } from 'antd'
import { notifySuccess, notifyError } from '../../../lib/notification'
import { errorHandler } from '../../../lib/utils'
import { updateCustomerThunk } from '../../../thunks/customer'
import FormerInfo from './FormerInfo'

class EditModal extends React.Component {
  constructor (props) {
    super(props)
    this.update = this.update.bind(this)
  }

  update (e, form, id) {
    e.preventDefault()
    form.validateFields((err, values) => {
      if (err) return undefined

      values.id = id
      this.props.dispatch(updateCustomerThunk(values)).then(res => {
        notifySuccess('حساب مشتری مورد نظر با موفقیت بروز شد.')
        this.props.reloadList()
        this.props.viewer(false)
        form.resetFields()
        return true
      }).catch(e => {
        notifyError(errorHandler(e))
        return false
      })
    })
  }

  render () {
    const { customer } = this.props
    return (
      <Modal
        destroyOnClose
        title="ویرایش حساب مشتری موردنظر"
        visible={this.props.show}
        onCancel={() => this.props.viewer(false)}
        footer={<Button onClick={() => this.props.viewer(false)}>لغو</Button>}>
          <FormerInfo onSubmit={this.update} dispatch={this.props.dispatch} customer={customer} />
      </Modal>
    )
  }
}

EditModal.propTypes = {
  show: PropTypes.bool,
  viewer: PropTypes.func,
  dispatch: PropTypes.func,
  customer: PropTypes.object,
  reloadList: PropTypes.func
}

export default EditModal
