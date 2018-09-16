import React from 'react'
import {Table} from 'antd'
import PropTypes from 'prop-types'
import moment from 'moment-jalaali'
moment.loadPersian([{usePersianDigits: true, dialect: 'persian-modern'}])

class PaymentTableList extends React.Component {
  render () {
    const {list} = this.props
    const columns = [
      { title: 'شماره رهگیری',
        dataIndex: 'trackingCode',
        key: 'trackingCode',
      },
      { title: 'رسید پرداخت',
        dataIndex: 'reffererCode',
        key: 'reffererCode',
      },
      { title: 'مبلغ',
        dataIndex: 'amount',
        key: 'amount',
        render: (amount, record) => `${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} تومان`
      },
      { title: 'نوع',
        dataIndex: 'type',
        key: 'type',
      },
      { title: 'کد وضعیت',
        dataIndex: 'statusCode',
        key: 'statusCode',
      },
      { title: 'وضعیت',
        dataIndex: 'status',
        key: 'status',
      },
      { title: 'تاریخ ایجاد',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (value, record) => moment(value).locale('fa').format('jD jMMMM jYY (H:mm)')
      },
    ]
    return (
      <Table dataSource={list} rowKey={record => record.id} columns={columns} pagination={false} />
    )
  }
}

PaymentTableList.propTypes = {
  list: PropTypes.array,
}

export default PaymentTableList
