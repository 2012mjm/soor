import React from 'react'
import {Table} from 'antd'
import PropTypes from 'prop-types'

class ProductTableList extends React.Component {
  render () {
    const {list} = this.props
    const columns = [
      { title: 'نام محصول',
        dataIndex: 'product',
        key: 'product',
        render: (product, record) => product.name.fa
      },
      { title: 'وزن',
        dataIndex: 'weight',
        key: 'weight',
      },
      { title: 'قیمت واحد',
        dataIndex: 'price',
        key: 'price',
        render: (price, record) => `${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} تومان`
      },
      { title: 'تعداد',
        dataIndex: 'count',
        key: 'count',
      },
      { title: 'قیمت کل',
        key: 'total',
        render: (value, record) => `${(record.price * record.count).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} تومان`
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
