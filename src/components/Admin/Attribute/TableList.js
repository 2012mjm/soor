import React from 'react'
import {Table, Icon, Popconfirm} from 'antd'
import PropTypes from 'prop-types'

class TableList extends React.Component {
  render () {
    const {list, loading} = this.props
    const columns = [
      { title: 'کلید',
        dataIndex: 'key',
        key: 'key',
        render: (key, record) => key
      },
      { title: 'عنوان',
        dataIndex: 'title',
        key: 'title',
        render: (title, record) => title.fa
      },
      { title: 'عملیات',
        key: 'operations',
        render: (text, record) => (<div>
          <a onClick={() => this.props.viewer(true, record)}><Icon type="eye" style={{ fontSize: 17 }} title="نمایش مقادیر" /></a>{' '}
          <a onClick={() => this.props.addValue(true, record)}><Icon type="plus" style={{ fontSize: 17 }} title="افزودن مقدار جدید" /></a>{' '}
          <a onClick={() => this.props.editor(true, record)}><Icon type="edit" style={{ fontSize: 17 }} /></a>{' '}
          <Popconfirm title="اطمینان به حذف این خواص محصول دارید؟" okText="بله" cancelText="خیر" placement="topLeft" onConfirm={() => this.props.delete(record.id)}>
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
  list: PropTypes.array,
  loading: PropTypes.bool,
  viewer: PropTypes.func,
  editor: PropTypes.func,
  addValue: PropTypes.func,
}

export default TableList
