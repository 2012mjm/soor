import React, { Component } from 'react'
import {Layout, Menu, Icon} from 'antd'
import PropTypes from 'prop-types'
import './sideMenu.css'

class SideMenu extends Component {
  constructor (props) {
    super(props)
    this.state = {
      current: null,
      collapsed: false,
    }
    this.onCollapse = this.onCollapse.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  onCollapse (collapsed) {
    this.setState({ collapsed })
  }

  handleClick (e) {
    this.props.history.push(e.key)
  }

  render () {
    const { Sider } = Layout
    // const { SubMenu } = Menu
    return (
      <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
        <div className="logo" >
          {/* <img src={logo} alt="logo" height="39" width="97" className="logoimg" /> */}
        </div>
        <Menu id="mainSideMenu" theme="dark" defaultSelectedKeys={['1']} mode="inline" onClick={this.handleClick}>
          <Menu.Item key="/store/product">
            <Icon type="shopping-cart" />
            <span className="menu">محصولات</span>
          </Menu.Item>
          <Menu.Item key="/store/invoice">
            <Icon type="exception" />
            <span className="menu">سفارشات</span>
          </Menu.Item>
          <Menu.Item key="/store/profile">
            <Icon type="shop" />
            <span className="menu">پروفایل</span>
          </Menu.Item>
        </Menu>
      </Sider>
    )
  }
}

SideMenu.propTypes = {
  isAuthenticated: PropTypes.bool,
  collapsedMenu: PropTypes.bool
}

export default SideMenu
