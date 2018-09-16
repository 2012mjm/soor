import React from 'react'
import { Card, Layout, Row, Col, Button } from 'antd'
import { connect } from 'react-redux'
import { categoryThunk } from '../../../thunks/category'
import AddModal from './AddModal'
import EditModal from './EditModal'
import TreeList from './TreeList'

class Screen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      isAddModalVisible: false,
      isEditModalVisible: false,
      isTreeShow: false,
      list: [],
      categoryValues: {}
    }
    this.toggleAddModal = this.toggleAddModal.bind(this)
    this.toggleEditModal = this.toggleEditModal.bind(this)
    this.getCategoryList = this.getCategoryList.bind(this)
  }

  toggleAddModal (show = true) {
    this.setState({isAddModalVisible: !!show})
  }

  toggleEditModal (show = true, category) {
    this.setState({isEditModalVisible: !!show, categoryValues: category, isTreeShow: false}, () => {
      this.setState({isTreeShow: true})
    })
  }

  getCategoryList () {
    this.setState({loading: true})

    this.props.dispatch(categoryThunk()).then((res) => {
      if (res.length > 0) {
        this.setState({list: res, loading: false, isTreeShow: true})
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
    this.getCategoryList()
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.list) {
      return this.setState({list: nextProps.list})
    }
  }

  render () {
    const { list, isTreeShow, isAddModalVisible, isEditModalVisible, categoryValues } = this.state
    return (
      <Layout>
        <AddModal show={isAddModalVisible} viewer={this.toggleAddModal} dispatch={this.props.dispatch} reloadList={this.getCategoryList} />
        <EditModal show={isEditModalVisible} viewer={this.toggleEditModal} dispatch={this.props.dispatch} reloadList={this.getCategoryList} category={categoryValues} />
        <Layout.Content>
          <Row gutter={48}>
            <Col span={12}><h2>دسته بندی ها</h2></Col>
            <Col span={12}>
              <Button className="btn-left" type="primary" onClick={this.toggleAddModal}>افزودن</Button>
            </Col>
          </Row>
          <Card>
            {isTreeShow && <TreeList list={list} viewer={this.toggleEditModal} />}
          </Card>
        </Layout.Content>
      </Layout>
    )
  }
}

function mapStateToProps (state) {
  return {
    list: state.category.list
  }
}

export default connect(mapStateToProps)(Screen)
