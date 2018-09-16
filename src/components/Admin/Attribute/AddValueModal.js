import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Button } from 'antd'
import { notifySuccess, notifyError } from '../../../lib/notification'
import { errorHandler } from '../../../lib/utils'
import { addValueAttributeThunk } from '../../../thunks/attribute'
import FormerValue from './FormerValue'

class AddValueModal extends React.Component {
  constructor (props) {
    super(props)
    this.create = this.create.bind(this)
  }

  create = (e, form, attribute_id=null) => {
    e.preventDefault()
    form.validateFields((err, values) => {
      if (err) return undefined

      values.attribute_id = attribute_id
      this.props.dispatch(addValueAttributeThunk(values)).then(res => {
        notifySuccess('مقدار خواص جدید با موفقیت ثبت شد.')
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
        title="افزودن مقدار خواص جدید"
        visible={this.props.show}
        onCancel={() => this.props.viewer(false)}
        footer={<Button onClick={() => this.props.viewer(false)}>بستن</Button>}>
          <FormerValue onSubmit={this.create} dispatch={this.props.dispatch} attribute={this.props.attribute} />
      </Modal>
    )
  }
}

AddValueModal.propTypes = {
  show: PropTypes.bool,
  viewer: PropTypes.func,
  dispatch: PropTypes.func,
  attribute: PropTypes.object,
}

export default AddValueModal
