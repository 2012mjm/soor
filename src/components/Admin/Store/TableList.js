import React from 'react'
import {Table} from 'antd'
import PropTypes from 'prop-types'
import moment from 'moment-jalaali'
moment.loadPersian([{usePersianDigits: true, dialect: 'persian-modern'}])

class TableList extends React.Component {
  render () {
    const {list, loading} = this.props
    return (
      <Table dataSource={list} rowKey={record => record.id} columns={columns} loading={loading} />
    )
  }
}

const columns = [
  { title: 'نام فروشگاه',
    dataIndex: 'title',
    key: 'title',
    render: (value, record) => value.fa
  },
  { title: 'صاحب فروشگاه',
    dataIndex: 'owner',
    key: 'owner',
    render: (value, record) => value.fa
  },
  { title: 'موبایل',
    dataIndex: 'mobile',
    key: 'mobile'
  },
  { title: 'ایمیل',
    dataIndex: 'email',
    key: 'email'
  },
  { title: 'تاریخ ایجاد',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (value, record) => moment(value).locale('fa').format('jD jMMMM jYY (H:mm)')
    
  },
  // { title: 'عملیات',
  //   key: 'operations',
  //   render: (text, record) => (<div>
  //     <a onClick={() => this.props.viewer(true, record)}><Icon type="edit" style={{ fontSize: 17 }} /></a>
  //     <a onClick={() => this.props.viewer(true, record)}><Icon type="delete" style={{ fontSize: 17 }} /></a>
  //   </div>)
  // }
]

TableList.propTypes = {
  dataSource: PropTypes.array,
  loading: PropTypes.bool
}

export default TableList
