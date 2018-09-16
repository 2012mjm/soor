import React from 'react'
import { Card, Layout, Row, Col, Button } from 'antd'
import { connect } from 'react-redux'
import { customerThunk } from '../../../thunks/customer'
import AddModal from './AddModal'
import EditModal from './EditModal'
import TableList from './TableList'

class Screen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      isAddModalVisible: false,
      isEditModalVisible: false,
      list: [],
      customerEditValues: {}
    }
    this.toggleAddModal     = this.toggleAddModal.bind(this)
    this.toggleEditModal    = this.toggleEditModal.bind(this)
    this.getCustomerList     = this.getCustomerList.bind(this)
  }

  toggleAddModal = (show = true) => {
    this.setState({isAddModalVisible: !!show})
  }

  toggleEditModal = (show = true, customer) => {
    if(show) this.setState({customerEditValues: customer})
    this.setState({isEditModalVisible: !!show})
  }

  getCustomerList = () => {
    this.setState({loading: true})

    this.props.dispatch(customerThunk(1, 100)).then((res) => {
      this.setState({list: res, loading: false})
      return true
    }).catch(() => {
      this.setState({loading: false})
      return false
    })
  }

  componentDidMount = () => {
    this.getCustomerList()
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.list) {
      return this.setState({list: nextProps.list})
    }
  }

  render () {
    const { list, loading, isAddModalVisible, isEditModalVisible, customerEditValues } = this.state
    return (
      <Layout>
        <AddModal show={isAddModalVisible} viewer={this.toggleAddModal} dispatch={this.props.dispatch} reloadList={this.getCustomerList} />
        <EditModal show={isEditModalVisible} viewer={this.toggleEditModal} dispatch={this.props.dispatch} reloadList={this.getCustomerList} customer={customerEditValues} />
        <Layout.Content>
          <Row gutter={48}>
            <Col span={12}><h2>مشتری‌ها</h2></Col>
            <Col span={12}>
              <Button className="btn-left" type="primary" onClick={this.toggleAddModal}>ساخت حساب مشتری جدید</Button>
            </Col>
          </Row>
          <Card>
            <TableList list={list} editor={this.toggleEditModal} loading={loading} />
          </Card>
        </Layout.Content>
      </Layout>
    )
  }
}

function mapStateToProps (state) {
  return {
    list: state.customer.list
  }
}

export default connect(mapStateToProps)(Screen)
