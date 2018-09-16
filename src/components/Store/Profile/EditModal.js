import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Button } from 'antd'
import { notifySuccess, notifyError } from '../../../lib/notification'
import { errorHandler } from '../../../lib/utils'
import { updateStoreThunk } from '../../../thunks/store'
import Former from './Former'

class EditModal extends React.Component {
  constructor (props) {
    super(props)
    this.update = this.update.bind(this)
  }

  update (e, form, id) {
    e.preventDefault()
    form.validateFields((err, values) => {
      if (err) return undefined

      let data = new window.FormData()
      for(let attr in values) {
        if(attr === 'logo') continue
        if(values[attr]) data.append(attr, values[attr])
      }
      if(values.logo) data.append('logo', values.logo.file)

      this.props.dispatch(updateStoreThunk(data)).then(res => {
        notifySuccess('ویرایش اطلاعات با موفقیت انجام شد.')
        this.props.reload()
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
    const { store } = this.props
    return (
      <Modal
        destroyOnClose
        width={600}
        title="ویرایش"
        visible={this.props.show}
        onCancel={() => this.props.viewer(false)}
        footer={<Button onClick={() => this.props.viewer(false)}>بستن</Button>}>
          <Former onSubmit={this.update} dispatch={this.props.dispatch} store={store} />
      </Modal>
    )
  }
}

EditModal.propTypes = {
  show: PropTypes.bool,
  viewer: PropTypes.func,
  dispatch: PropTypes.func,
  store: PropTypes.object,
  reload: PropTypes.func
}

export default EditModal
