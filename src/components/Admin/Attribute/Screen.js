import React from 'react'
import { Card, Layout, Row, Col, Button } from 'antd'
import { connect } from 'react-redux'
import { attributeThunk, deleteAttributeThunk, infoAttributeThunk } from '../../../thunks/attribute'
import { notifySuccess, notifyError } from '../../../lib/notification'
import { errorHandler } from '../../../lib/utils'
import AddModal from './AddModal'
import EditModal from './EditModal'
import ViewModal from './ViewModal'
import AddValueModal from './AddValueModal'
import TableList from './TableList'

class Screen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      isAddModalVisible: false,
      isEditModalVisible: false,
      isViewModalVisible: false,
      isAddValueModalVisible: false,
      list: [],
      attributeValues: {},
      attributeEditValues: {},
      attributeAddValue: {}
    }
    this.toggleAddModal     = this.toggleAddModal.bind(this)
    this.toggleEditModal    = this.toggleEditModal.bind(this)
    this.toggleViewModal    = this.toggleViewModal.bind(this)
    this.toggleAddValueModal= this.toggleAddValueModal.bind(this)
    this.getAttributeList   = this.getAttributeList.bind(this)
    this.handleDelete       = this.handleDelete.bind(this)
  }

  toggleAddModal = (show = true) => {
    this.setState({isAddModalVisible: !!show})
  }

  toggleEditModal = (show = true, attribute) => {
    if(show) {
      this.props.dispatch(infoAttributeThunk(attribute.id)).then(res => {
        this.setState({attributeEditValues: res})
        this.setState({isEditModalVisible: true})
      }, e => {
        notifyError(errorHandler(e))
        this.setState({isEditModalVisible: false})
      })
    } else {
      this.setState({isEditModalVisible: false})
    }
  }

  toggleViewModal = (show = true, attribute) => {
    if(show) {
      this.props.dispatch(infoAttributeThunk(attribute.id)).then(res => {
        this.setState({attributeValues: res})
      }, e => {
        notifyError(errorHandler(e))
      })
    }

    this.setState({isViewModalVisible: !!show})
  }

  toggleAddValueModal = (show = true, attribute) => {
    this.setState({isAddValueModalVisible: !!show, attributeAddValue: attribute})
  }

  handleDelete = (id) => {
    this.props.dispatch(deleteAttributeThunk(id)).then(res => {
      this.getAttributeList()
      notifySuccess(res.messages[0])
    }, e => {
      notifyError(errorHandler(e))
    })
  }

  getAttributeList = () => {
    this.setState({loading: true})

    this.props.dispatch(attributeThunk(1, 100)).then((res) => {
      this.setState({list: res, loading: false})
      return true
    }).catch(() => {
      this.setState({loading: false})
      return false
    })
  }

  componentDidMount = () => {
    this.getAttributeList()
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.list) {
      return this.setState({list: nextProps.list})
    }
  }

  render () {
    const { list, loading, isAddModalVisible, isEditModalVisible, isViewModalVisible, isAddValueModalVisible, attributeValues, attributeEditValues, attributeAddValue } = this.state
    return (
      <Layout>
        <AddModal show={isAddModalVisible} viewer={this.toggleAddModal} dispatch={this.props.dispatch} reloadList={this.getAttributeList} />
        <EditModal show={isEditModalVisible} viewer={this.toggleEditModal} dispatch={this.props.dispatch} reloadList={this.getAttributeList} attribute={attributeEditValues} />
        <ViewModal show={isViewModalVisible} viewer={this.toggleViewModal} dispatch={this.props.dispatch} attribute={attributeValues} />
        <AddValueModal show={isAddValueModalVisible} viewer={this.toggleAddValueModal} dispatch={this.props.dispatch} attribute={attributeAddValue} />
        <Layout.Content>
          <Row gutter={48}>
            <Col span={12}><h2>خواص محصول</h2></Col>
            <Col span={12}>
              <Button className="btn-left" type="primary" onClick={this.toggleAddModal}>افزودن خواص جدید محصول</Button>
            </Col>
          </Row>
          <Card>
            <TableList list={list} editor={this.toggleEditModal} viewer={this.toggleViewModal} addValue={this.toggleAddValueModal} delete={this.handleDelete} loading={loading} />
          </Card>
        </Layout.Content>
      </Layout>
    )
  }
}

function mapStateToProps (state) {
  return {
    list: state.attribute.list
  }
}

export default connect(mapStateToProps)(Screen)
