import React from 'react'
import {Layout, Menu, Icon} from 'antd'
import PropTypes from 'prop-types'
import './sideMenu.css'

class SideMenu extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      current: null,
      collapsed: false
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
    const { SubMenu } = Menu
    const { Sider } = Layout
    return (
      <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
        <div className="logo" />
        <Menu id="mainSideMenu" theme="dark" defaultSelectedKeys={['1']} mode="inline" onClick={this.handleClick}>
          <SubMenu title={<span><Icon type="database" /><span className="menu">محصولات</span></span>}>
            <Menu.Item key="/store/product">
              <Icon type="file-text" />
              <span className="menu">لیست محصولات</span>
            </Menu.Item>
            <Menu.Item key="/store/product/add">
              <Icon type="file-text" />
              <span className="menu">افزودن محصول جدید</span>
            </Menu.Item>
          </SubMenu>
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
