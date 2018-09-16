import React from 'react'
import {Table, Icon, Popconfirm} from 'antd'
import PropTypes from 'prop-types'
import { ellipse, priceFormat, statusStyle } from '../../../lib/utils'
import { PRODUCT_STATUS } from '../../../lib/constants'
import moment from 'moment-jalaali'
moment.loadPersian([{usePersianDigits: true, dialect: 'persian-modern'}])

class TableList extends React.Component {
  render () {
    const {list, loading} = this.props
    const columns = [
      { title: 'عنوان',
        dataIndex: 'title',
        key: 'title',
        render: (value, record) => ellipse(value.fa, 20, true)
      },
      { title: 'دسته',
        dataIndex: 'category',
        key: 'category',
        render: (category, record) => category.title.fa
      },
      { title: 'قیمت',
        dataIndex: 'price',
        key: 'price',
        render: (price, record) => {
          if(record.discount) {
            return <div>
              <span style={{textDecoration: 'line-through', color: 'silver'}}>{priceFormat(price)}</span>
              <br />
              {priceFormat(price - record.discount)}
            </div>
          }
          return priceFormat(price)
        }
      },
      { title: 'موجودی',
        dataIndex: 'quantity',
        key: 'quantity'
      },
      { title: 'وضعیت',
        dataIndex: 'status',
        key: 'status',
        render: (status, record) => statusStyle(status, PRODUCT_STATUS[status])
      },
      { title: 'تاریخ ایجاد',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (value, record) => moment(value).locale('fa').format('jD jMMMM jYY (H:mm)')
      },
      { title: 'عملیات',
        key: 'operations',
        render: (text, record) => (<div>
          <a onClick={() => this.props.viewer(true, record)}><Icon type="eye" style={{ fontSize: 17 }} /></a>{' '}
          <a onClick={() => this.props.editor(true, record)}><Icon type="edit" style={{ fontSize: 17 }} /></a>{' '}
          <Popconfirm title="اطمینان به حذف این محصول دارید؟" okText="بله" cancelText="خیر" placement="topLeft" onConfirm={() => this.props.delete(record.id)}>
            <a><Icon type="delete" style={{ fontSize: 17 }} /></a>
          </Popconfirm>
        </div>)
      }
    ]
    return (
      <Table dataSource={list} rowKey={record => record.id} columns={columns} loading={loading} />
    )
  }
}

TableList.propTypes = {
  dataSource: PropTypes.array,
  loading: PropTypes.bool,
  viewer: PropTypes.func,
  editor: PropTypes.func,
}

export default TableList
