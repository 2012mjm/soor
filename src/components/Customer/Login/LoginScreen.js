import React, { Component } from 'react'
import './login.css'
import { Layout } from 'antd'
import { connect } from 'react-redux'
import LoginForm from './LoginForm'
import VerifyForm from './VerifyForm'
import { customerLoginThunk, customerVerifyThunk } from '../../../thunks/auth'
import { notifySuccess, notifyError } from '../../../lib/notification'
import { errorHandler } from '../../../lib/utils'

class CustomerLoginScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showLoginForm: true,
      showVerifyForm: false,
      customerId: null,
      mobile: null
    }
    this.login = this.login.bind(this)
  }

  login (e, form) {
    e.preventDefault()

    form.validateFields((err, values) => {
      if (err) return undefined

      this.props.dispatch(customerLoginThunk(values)).then((res) => {
        notifySuccess(res.messages[0])
        this.setState({
          showLoginForm: false,
          showVerifyForm: true,
          customerId: res.id,
          mobile: values.mobile
        })
        return true
      }).catch((e) => {
        notifyError(errorHandler(e))
        return false
      })
    })
  }

  verify (e, form) {
    e.preventDefault()

    form.validateFields((err, values) => {
      if (err) return undefined

      values.id = this.state.customerId
      this.props.dispatch(customerVerifyThunk(values)).then((res) => {
        notifySuccess(res.messages[0])
        this.props.history.push('/customer')
        return true
      }).catch((e) => {
        notifyError(errorHandler(e))
        return false
      })
    })
  }

  render () {
    const { Content } = Layout
    const { showLoginForm, showVerifyForm, mobile } = this.state
    return (
      <Layout className="container">
        <Content type="flex" justify="space-around" align="middle">
          <h2 className="login-title">ورود به پنل مشتری</h2>
          <div className="card-container">
            {showLoginForm && <LoginForm onSubmit={this.login} />}
            {showVerifyForm && <VerifyForm onSubmit={this.verify} mobile={mobile} />}
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

export default connect(mapStateToProps)(CustomerLoginScreen)
