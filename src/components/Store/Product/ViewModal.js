import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Button, Tabs, Icon } from 'antd'
import ListItem from '../../common/ListItem'
import { PRODUCT_STATUS } from '../../../lib/constants'
import { priceFormat, statusStyle } from '../../../lib/utils'
import FormerPhoto from './FormerPhoto'

class ViewModal extends React.Component {
  render () {
    const { product } = this.props
    const TabPane = Tabs.TabPane
    return (
      <Modal
        destroyOnClose
        visible={this.props.show}
        onCancel={() => this.props.viewer(false)}
        footer={<Button onClick={() => this.props.viewer(false)}>بستن</Button>}>

          {product.id !== undefined &&
            <Tabs defaultActiveKey="1">
              <TabPane tab={<span><Icon type="shopping-cart" />جزئیات محصول</span>} key="1">
                <ListItem title="دسته" value={`${product.category.title.fa} (${product.category.title.en || '-'})`} />
                <ListItem title="عنوان" value={`${product.title.fa} (${product.title.en || '-'})`} />
                
                <ListItem title="قیمت" value={priceFormat(product.price.toString())} />
                <ListItem title="تخفیف" value={priceFormat(product.discount && product.discount.toString())} />
                <ListItem title="موجودی" value={product.quantity && product.quantity.toString()} />
                <ListItem title="ستاره" value={product.rate.toString()} />
                <ListItem title="وزن" value={product.weight && product.weight.toString()} />
                <ListItem title="ابعاد" value={product.dimensions && product.dimensions.toString()} isLTR />
                <ListItem title="وضعیت" value={statusStyle(product.status, PRODUCT_STATUS[product.status])} />
                {product.reasonRejected && <ListItem title="دلیل رد" value={product.reasonRejected} />}
                
                <ListItem title="توضیح (فارسی)" value={product.description.fa} />
                <ListItem title="توضیح (انگلیسی)" value={product.description.en} />
              </TabPane>

              <TabPane tab={<span><Icon type="camera-o" />تصاویر</span>} key="2">
                <FormerPhoto productId={product.id} images={product.images} />
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
  dispatch: PropTypes.func,
  product: PropTypes.object
}

export default ViewModal
