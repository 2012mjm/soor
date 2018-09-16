import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Button } from 'antd'
import ValueTableList from './ValueTableList'

class ViewModal extends React.Component {
  render () {
    const { attribute } = this.props
    return (
      <Modal
        destroyOnClose
        title="جزئیات"
        visible={this.props.show}
        onCancel={() => this.props.viewer(false)}
        footer={<Button onClick={() => this.props.viewer(false)}>بستن</Button>}>

          {attribute && attribute.id !== undefined &&
            <ValueTableList list={attribute.values} />
          }
      </Modal>
    )
  }
}

ViewModal.propTypes = {
  show: PropTypes.bool,
  viewer: PropTypes.func,
  dispatch: PropTypes.func,
  attribute: PropTypes.object
}

export default ViewModal
