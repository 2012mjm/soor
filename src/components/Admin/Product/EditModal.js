import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Button } from 'antd'
import { notifySuccess, notifyError } from '../../../lib/notification'
import { errorHandler } from '../../../lib/utils'
import { updateProductThunk } from '../../../thunks/product'
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
      this.props.dispatch(updateProductThunk(values)).then(res => {
        notifySuccess('محصول مورد نظر با موفقیت بروز شد.')
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
    const { product } = this.props
    return (
      <Modal
        destroyOnClose
        width={800}
        title="ویرایش محصول موردنظر"
        visible={this.props.show}
        onCancel={() => this.props.viewer(false)}
        footer={<Button onClick={() => this.props.viewer(false)}>لغو</Button>}>
          <FormerInfo onSubmit={this.update} dispatch={this.props.dispatch} product={product} />
      </Modal>
    )
  }
}

EditModal.propTypes = {
  show: PropTypes.bool,
  viewer: PropTypes.func,
  dispatch: PropTypes.func,
  product: PropTypes.object,
  reloadList: PropTypes.func
}

export default EditModal
