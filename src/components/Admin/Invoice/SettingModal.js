import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Button, Icon } from 'antd'
import { notifySuccess, notifyError } from '../../../lib/notification'
import { errorHandler } from '../../../lib/utils'
import { updateInvoiceThunk } from '../../../thunks/invoice'

class SettingModal extends React.Component {
  constructor (props) {
    super(props)
    this.updateStatus = this.updateStatus.bind(this)
  }

  updateStatus = () => {
    this.props.dispatch(updateInvoiceThunk({id: this.props.invoice.id, status: 'sent-final'})).then(res => {
      notifySuccess('به حالت ارسال شده تغییر وضعیت داده شد.')
      this.props.reloadList()
      this.props.viewer(false)
    }, e => {
      notifyError(errorHandler(e))
    })
  }

  render () {
    const { invoice } = this.props
    return (
      <Modal
        width={400}
        destroyOnClose
        title="تغییر وضعیت"
        visible={this.props.show}
        onCancel={() => this.props.viewer(false)}
        footer={<Button onClick={() => this.props.viewer(false)}>بستن</Button>}>
          {invoice && invoice.id !== undefined && <div>
              <p>پس از ارسال سفارش مورد نظر کلید زیر را بفشارید.</p>
              <Button type="primary" onClick={this.updateStatus}><Icon type="rocket" /> ارسال شد</Button>
            </div>
          }
      </Modal>
    )
  }
}

SettingModal.propTypes = {
  show: PropTypes.bool,
  viewer: PropTypes.func,
  invoice: PropTypes.object,
  reloadList: PropTypes.func,
  dispatch: PropTypes.func,
}

export default SettingModal
