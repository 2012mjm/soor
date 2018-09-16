import React, { Component } from 'react'
import './login.css'
import { Form, Icon, Input, Button } from 'antd'

class LoginForm extends Component {
  render () {
    const FormItem = Form.Item
    const { getFieldDecorator } = this.props.form
    return (
      <Form className="login-form" onSubmit={(e) => this.props.onSubmit(e, this.props.form)}>
        <FormItem>
          {getFieldDecorator('mobile', {
            rules: [{required: true, message: 'این فیلد الزامی است'}]
          })(
            <Input prefix={<Icon type="mobile" style={{color: 'rgba(0,0,0,0.25)'}} />} placeholder="شماره موبایل" />
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" className="login-form-button">
            ورود
          </Button>
        </FormItem>
      </Form>
    )
  }
}

export default Form.create()(LoginForm)
