import React from 'react'
import {Table} from 'antd'
import PropTypes from 'prop-types'
import { ORDER_STATUS } from '../../../lib/constants'
import { priceFormat, statusOrderStyle } from '../../../lib/utils'

class ProductTableList extends React.Component {
  render () {
    const {list} = this.props
    const columns = [
      { title: 'نام محصول',
        dataIndex: 'product',
        key: 'product',
        render: (product, record) => product.title.fa
      },
      // { title: 'وزن',
      //   dataIndex: 'weight',
      //   key: 'weight',
      // },
      { title: 'وضعیت',
        dataIndex: 'status',
        key: 'status',
        render: (status, record) => statusOrderStyle(status, ORDER_STATUS[status])
      },
      { title: 'قیمت واحد',
        dataIndex: 'price',
        key: 'price',
        render: (price, record) => priceFormat(price)
      },
      { title: 'تعداد',
        dataIndex: 'count',
        key: 'count',
      },
      { title: 'قیمت کل',
        key: 'total',
        render: (value, record) => priceFormat(record.price * record.count)
      },
    ]
    return (
      <Table dataSource={list} rowKey={record => record.id} columns={columns} pagination={false} />
    )
  }
}

ProductTableList.propTypes = {
  list: PropTypes.array,
}

export default ProductTableList
