import React from 'react'
import {Table, Icon} from 'antd'
import PropTypes from 'prop-types'
import moment from 'moment-jalaali'
moment.loadPersian([{usePersianDigits: true, dialect: 'persian-modern'}])

class TableList extends React.Component {
  render () {
    const {list, loading} = this.props
    const columns = [
      { title: 'موبایل',
        dataIndex: 'mobile',
        key: 'mobile',
        render: (mobile, record) => mobile
      },
      { title: 'نام',
        dataIndex: 'name',
        key: 'name',
        render: (name, record) => name
      },
      { title: 'وضعیت موبایل',
        dataIndex: 'is_verified_mobile',
        key: 'is_verified_mobile',
        render: (value, record) => (value === 1) ? 'تایید شده' : 'تایید نشده'
      },
      { title: 'وضعیت اکانت',
        dataIndex: 'status',
        key: 'status'
      },
      { title: 'تاریخ ایجاد',
        dataIndex: 'created_at',
        key: 'created_at',
        render: (value, record) => moment(value).locale('fa').format('jD jMMMM jYY (H:mm)')
      },
      { title: 'عملیات',
        key: 'operations',
        render: (text, record) => (<div>
          <a onClick={() => this.props.editor(true, record)}><Icon type="edit" style={{ fontSize: 17 }} /></a>{' '}
        </div>)
      }
    ]
    return (
      <Table dataSource={list} rowKey={record => record.id} columns={columns} loading={loading} />
    )
  }
}

TableList.propTypes = {
  list: PropTypes.array,
  loading: PropTypes.bool,
  editor: PropTypes.func,
}

export default TableList
