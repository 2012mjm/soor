import React from 'react'
import {Table} from 'antd'
import PropTypes from 'prop-types'

class ValueTableList extends React.Component {
  render () {
    const {list} = this.props
    const columns = [
      { title: 'عنوان فارسی',
        dataIndex: 'title',
        key: 'title',
        render: (title, record) => title.fa
      },
      { title: 'عنوان انگلیسی',
        dataIndex: 'title',
        key: 'title',
        render: (title, record) => title.en
      },
      { title: 'مقدار',
        dataIndex: 'value',
        key: 'value',
        render: (value, record) => value
      },
    ]
    return (
      <Table size="small" dataSource={list} rowKey={record => record.id} columns={columns} />
    )
  }
}

ValueTableList.propTypes = {
  list: PropTypes.array,
}

export default ValueTableList
