import React from 'react'
import { Card, Layout, Row, Col, Button } from 'antd'
import { connect } from 'react-redux'
import { storeThunk } from '../../../thunks/store'
import AddModal from './AddModal'
import EditModal from './EditModal'
import TableList from './TableList'

class StoreScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      isAddModalVisible: false,
      isEditModalVisible: false,
      list: [],
      storeValues: {}
    }
    this.toggleAddModal = this.toggleAddModal.bind(this)
    this.toggleEditModal = this.toggleEditModal.bind(this)
    this.getStoreList = this.getStoreList.bind(this)
  }

  toggleAddModal (show = true) {
    this.setState({isAddModalVisible: !!show})
  }

  toggleEditModal (show = true, store) {
    this.setState({isEditModalVisible: !!show, storeValues: store})
  }

  getStoreList () {
    this.setState({loading: true})

    this.props.dispatch(storeThunk(1, 100)).then((res) => {
      if (res.length > 0) {
        this.setState({list: res, loading: false})
        return true
      } else {
        this.setState({loading: false})
        return false
      }
    }).catch(() => {
      this.setState({loading: false})
      return false
    })
  }

  componentDidMount () {
    this.getStoreList()
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.list) {
      return this.setState({list: nextProps.list})
    }
  }

  render () {
    const { list, loading, isAddModalVisible, isEditModalVisible, storeValues } = this.state
    return (
      <Layout>
        <AddModal show={isAddModalVisible} viewer={this.toggleAddModal} dispatch={this.props.dispatch} reloadList={this.getStoreList} />
        <EditModal show={isEditModalVisible} viewer={this.toggleEditModal} dispatch={this.props.dispatch} reloadList={this.getStoreList} store={storeValues} />
        <Layout.Content>
          <Row gutter={48}>
            <Col span={12}><h2>فروشگاه‌ها</h2></Col>
            <Col span={12}>
              <Button className="btn-left" type="primary" onClick={this.toggleAddModal}>ساخت فروشگاه جدید</Button>
            </Col>
          </Row>
          <Card>
            <TableList list={list} viewer={this.toggleEditModal} loading={loading} />
          </Card>
        </Layout.Content>
      </Layout>
    )
  }
}

function mapStateToProps (state) {
  return {
    list: state.store.list
  }
}

export default connect(mapStateToProps)(StoreScreen)
