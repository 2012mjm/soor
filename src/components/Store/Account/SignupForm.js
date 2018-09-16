import React, { Component } from 'react'
import './signup.css'
import { Form, Icon, Input, Button } from 'antd'

class SignupForm extends Component {
  render () {
    const FormItem = Form.Item
    const { getFieldDecorator } = this.props.form
    return (
      <Form className="signup-form" onSubmit={(e) => this.props.onSubmit(e, this.props.form)}>

        <FormItem>
          {getFieldDecorator('store_name_fa', {
            rules: [{required: true, message: 'این فیلد الزامی است'}]
          })(
            <Input prefix={<Icon type="shop" style={{color: 'rgba(0,0,0,0.25)'}} />} placeholder="نام فروشگاه" />
          )}
        </FormItem>

        <FormItem>
          {getFieldDecorator('mobile', {
            rules: [{required: true, message: 'این فیلد الزامی است'}]
          })(
            <Input prefix={<Icon type="mobile" style={{color: 'rgba(0,0,0,0.25)'}} />} placeholder="شماره موبایل" />
          )}
        </FormItem>

        <FormItem>
          {getFieldDecorator('password', {
            rules: [{required: true, message: 'این فیلد الزامی است'}]
          })(
            <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,0.25)'}} />} type="password" placeholder="کلمه عبور" />
          )}
        </FormItem>

        <FormItem>
          <Button type="primary" htmlType="submit" className="signup-form-button">
            ثبت نام
          </Button>
        </FormItem>
      </Form>
    )
  }
}

export default Form.create()(SignupForm)
