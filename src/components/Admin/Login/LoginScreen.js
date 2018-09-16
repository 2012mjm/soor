import React, { Component } from 'react'
import './login.css'
import { Layout } from 'antd'
import { connect } from 'react-redux'
import AdminLoginForm from './LoginForm'
import { managerLoginThunk } from '../../../thunks/auth'
import { notifySuccess, notifyError } from '../../../lib/notification'
import { errorHandler } from '../../../lib/utils'

class AdminLoginScreen extends Component {
  constructor (props) {
    super(props)
    this.adminLoginSubmit = this.adminLoginSubmit.bind(this)
  }

  adminLoginSubmit (e, form) {
    e.preventDefault()

    form.validateFields((err, values) => {
      if (err) return undefined

      this.props.dispatch(managerLoginThunk(values)).then((res) => {
        notifySuccess('ورود با موفقیت انجام شد')
        this.props.history.push('/admin')
        return true
      }).catch((e) => {
        notifyError(errorHandler(e))
        return false
      })
    })
  }

  render () {
    const { Content } = Layout
    return (
      <Layout className="container">
        <Content type="flex" justify="space-around" align="middle">
          <h2 className="login-title">ورود به پنل مدیریت</h2>
          <div className="card-container">
            <AdminLoginForm onSubmit={this.adminLoginSubmit} />
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

export default connect(mapStateToProps)(AdminLoginScreen)
