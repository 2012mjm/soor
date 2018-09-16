import React, { Component } from 'react'
import { Layout, Button, Icon } from 'antd'
import { connect } from 'react-redux'

class InitialScreen extends Component {
  render () {
    const { Content } = Layout
    const ButtonGroup = Button.Group
    return (
      <Layout className="container">
        <Content type="flex" justify="space-around" align="middle">
          <h2 className="login-title">ایرانی بخریم</h2>
          <div className="card-container">
            <ButtonGroup size="large">
              <Button type="primary" href="/store">
                <Icon type="shop" /> ورود به حساب صاحب فروشگاه
              </Button>
              <Button type="primary" href="/customer">
                <Icon type="user" /> ورود به حساب مشتری
              </Button>
            </ButtonGroup>
          </div>
        </Content>
      </Layout>
    )
  }
}

function mapStateToProps (state) {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(InitialScreen)
