import React from 'react'
import { Card, Layout, Row, Col, Button } from 'antd'
import { connect } from 'react-redux'
import { infoStoreThunk } from '../../../thunks/store'
import ListItem from '../../common/ListItem'
import EditModal from './EditModal'

class Screen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      isEditModalVisible: false,
      store: {id: null},
    }
    this.toggleEditModal  = this.toggleEditModal.bind(this)
    this.getStoreInfo     = this.getStoreInfo.bind(this)
  }

  toggleEditModal = (show = true, store) => {
    this.setState({isEditModalVisible: !!show})
  }

  getStoreInfo = () => {
    this.setState({loading: true})

    this.props.dispatch(infoStoreThunk()).then((res) => {
      this.setState({store: res, loading: false})
      return true
    }).catch(() => {
      this.setState({loading: false})
      return false
    })
  }

  componentDidMount = () => {
    this.getStoreInfo()
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.current) {
      return this.setState({store: nextProps.current})
    }
  }

  render () {
    const { store, isEditModalVisible } = this.state
    return (
      <Layout>
        <EditModal show={isEditModalVisible} viewer={this.toggleEditModal} dispatch={this.props.dispatch} reload={this.getStoreInfo} store={store} />
        <Layout.Content>
          <Row gutter={48}>
            <Col span={12}><h2>اطلاعات فروشگاه</h2></Col>
            <Col span={12}>
              <Button className="btn-left" type="primary" onClick={this.toggleEditModal}>ویرایش</Button>
            </Col>
          </Row>
          {store && store.id !== null &&
            <Card>
              <ListItem title="شماره موبایل" value={store.mobile} />
              <ListItem title="ایمیل" value={store.email || '-'} />
              <ListItem title="نام فروشگاه به فارسی" value={store.title.fa} />
              <ListItem title="نام فروشگاه به انگلیسی" value={store.title.en || '-'} />
              <ListItem title="نام صاحب فروشگاه به فارسی" value={store.owner.fa || '-'} />
              <ListItem title="نام صاحب فروشگاه به انگلیسی" value={store.owner.en || '-'} />
              <ListItem title="شعار فروشگاه به فارسی" value={store.slogan.fa || '-'} />
              <ListItem title="شعار فروشگاه به انگلیسی" value={store.slogan.en || '-'} />
              <ListItem title="توضیح به فارسی" value={store.description.fa || '-'} />
              <ListItem title="توضیح به انگلیسی" value={store.description.en || '-'} />
              <ListItem title="لوگو فروشگاه" value={<img className="default-photo" src={store.logo} alt="" /> || '-'} />
            </Card>
          }
        </Layout.Content>
      </Layout>
    )
  }
}

function mapStateToProps (state) {
  return {
    current: state.store.current
  }
}

export default connect(mapStateToProps)(Screen)
