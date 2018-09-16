import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Button } from 'antd'
import { notifySuccess, notifyError } from '../../../lib/notification'
import { errorHandler } from '../../../lib/utils'
import { addStoreThunk } from '../../../thunks/store'
import Former from './Former'

class AddModal extends React.Component {
  constructor (props) {
    super(props)
    this.create = this.create.bind(this)
  }

  create = (e, form, id=null) => {
    e.preventDefault()
    form.validateFields((err, values) => {
      if (err) return undefined

      this.props.dispatch(addStoreThunk(values)).then(res => {
        notifySuccess('فروشگاه جدید با موفقیت ثبت شد.')
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
    return (
      <Modal
        destroyOnClose
        title="ساخت فروشگاه جدید"
        visible={this.props.show}
        onCancel={() => this.props.viewer(false)}
        footer={<Button onClick={() => this.props.viewer(false)}>لغو</Button>}>
          <Former onSubmit={this.create} dispatch={this.props.dispatch} />
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
