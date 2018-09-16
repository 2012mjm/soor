import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Button } from 'antd'
import { notifySuccess, notifyError } from '../../../lib/notification'
import { errorHandler } from '../../../lib/utils'
import { addAttributeThunk } from '../../../thunks/attribute'
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

      this.props.dispatch(addAttributeThunk(values)).then(res => {
        notifySuccess('خواص جدید محصول با موفقیت ثبت شد.')
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
        title="افزودن خواص جدید محصول"
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
