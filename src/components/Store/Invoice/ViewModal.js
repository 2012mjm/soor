import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Button, Tabs, Icon } from 'antd'
import ListItem from '../../common/ListItem'
import ProductTableList from './ProductTableList'

class ViewModal extends React.Component {
  render () {
    const { invoice } = this.props
    const TabPane = Tabs.TabPane
    return (
      <Modal
        width={900}
        destroyOnClose
        visible={this.props.show}
        onCancel={() => this.props.viewer(false)}
        footer={<Button onClick={() => this.props.viewer(false)}>بستن</Button>}>

          {invoice && invoice.id !== undefined && 
            <Tabs defaultActiveKey="1">
              <TabPane tab={<span><Icon type="shopping-cart" />محصولات</span>} key="1">
                <ProductTableList list={invoice.orders} />
              </TabPane>

              <TabPane tab={<span><Icon type="user" />اطلاعات پستی گیرنده</span>} key="2">
                <ListItem title="استان" value={invoice.province.name} />
                <ListItem title="شهر" value={invoice.city.name} />
                <ListItem title="آدرس" value={invoice.address} />
                <ListItem title="کد پستی" value={invoice.postal_code} isLTR />
                <ListItem title="نام گیرنده" value={invoice.name} />
                <ListItem title="شماره تماس گیرنده" value={invoice.phone} isLTR />
              </TabPane>
            </Tabs>
          }
      </Modal>
    )
  }
}

ViewModal.propTypes = {
  show: PropTypes.bool,
  viewer: PropTypes.func,
  invoice: PropTypes.object
}

export default ViewModal
