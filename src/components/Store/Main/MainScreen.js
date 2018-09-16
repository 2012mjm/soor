import React, { Component } from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import './main.css'
import { Layout, Dropdown, Avatar, Menu, Icon } from 'antd'
import { connect } from 'react-redux'
import { logout } from '../../../actions/auth'
import SideMenu from '../SideMenu/SideMenu'
import ProductScreen from '../Product/Screen'
import InvoiceScreen from '../Invoice/Screen'
import ProfileScreen from '../Profile/Screen'

class MainStoreScreen extends Component {
  constructor (props) {
    super(props)
    this.handleMenuClick = this.handleMenuClick.bind(this)
  }

  handleMenuClick ({ key }) {
    if (key === 'logout') {
      this.props.dispatch(logout())
      this.props.history.push('/store/account')
    }
  }

  render () {
    const {auth, history} = this.props
    const {Header, Content} = Layout
    const menu = (
      <Menu className="menu" selectedKeys={[]} onClick={this.handleMenuClick}>
        <Menu.Item key="logout"><span>خروج</span><Icon type="logout" /></Menu.Item>
      </Menu>
    )
    if (history.location.pathname === '/store/account') { return <span /> }
    if (auth.isAuthenticated && auth.role !== 'store') { this.handleMenuClick({key: 'logout'}) }
    if (!auth.isAuthenticated) { this.props.history.push('/store/account') }
    return (
      <Layout className="container">
        <SideMenu collapsedMenu={false} {...this.props} />
        <Layout>
          <Header className="header">
            <div className="left">
              <Dropdown overlay={menu}>
                <span className="action account">
                  {auth.isAuthenticated && <span>{auth.mobile}</span>} <Avatar size="small" className="avatar" src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" />
                </span>
              </Dropdown>
            </div>
          </Header>
          <Content className="main-content">
            <Switch>
              <Route path="/store/product" component={ProductScreen} />
              <Route path="/store/invoice" component={InvoiceScreen} />
              <Route path="/store/profile" component={ProfileScreen} />
            </Switch>
            <div className="globalFooter">
              <div className="copyright">
                <Icon type="copyright" /> کلیه حقوق محفوظ است
              </div>
            </div>
          </Content>
        </Layout>

        {!auth.isAuthenticated && <Redirect to="/store/account" />}
      </Layout>
    )
  }
}

function mapStateToProps (state) {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(MainStoreScreen)
