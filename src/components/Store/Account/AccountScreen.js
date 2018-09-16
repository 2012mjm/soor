import React, { Component } from 'react'
import './login.css'
import { Layout, Tabs } from 'antd'
import { connect } from 'react-redux'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
import { storeLoginThunk } from '../../../thunks/auth'
import { storeSignupThunk } from '../../../thunks/store'
import { notifySuccess, notifyError } from '../../../lib/notification'
import { errorHandler } from '../../../lib/utils'

class LoginScreen extends Component {
  constructor (props) {
    super(props)
    this.loginSubmit = this.loginSubmit.bind(this)
    this.signupSubmit = this.signupSubmit.bind(this)
  }

  loginSubmit (e, form) {
    e.preventDefault()

    form.validateFields((err, values) => {
      if (err) return undefined

      this.props.dispatch(storeLoginThunk(values)).then((res) => {
        notifySuccess('ورود با موفقیت انجام شد')
        this.props.history.push('/store')
        return true
      }).catch((e) => {
        notifyError(errorHandler(e))
        return false
      })
    })
  }

  signupSubmit (e, form) {
    e.preventDefault()

    form.validateFields((err, values) => {
      if (err) return undefined

      this.props.dispatch(storeSignupThunk(values)).then((res) => {
        notifySuccess('فروشگاه شما با موفقیت ثبت شد.')
        this.props.history.push('/store')
        return false
      }).catch((e) => {
        notifyError(errorHandler(e))
      })
    })
  }

  render () {
    const { auth, history } = this.props
    const { Content } = Layout
    const TabPane = Tabs.TabPane

    if (auth.isAuthenticated && !auth.isAdmin) { history.replace('/store') }
    if (auth.isAuthenticated && auth.isAdmin) { history.replace('/admin') }

    return (
      <Layout className="container">
        <Content type="flex" justify="space-around" align="middle">
          <h2 className="login-title">پنل صاحبان فروشگاه</h2>
          <div className="card-container">
            <Tabs type="card">
              <TabPane tab="ورود" key="2">
                <LoginForm onSubmit={this.loginSubmit} />
              </TabPane>
              <TabPane tab="ثبت نام فروشگاه" key="1">
                <SignupForm onSubmit={this.signupSubmit} />
              </TabPane>
            </Tabs>
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

export default connect(mapStateToProps)(LoginScreen)
