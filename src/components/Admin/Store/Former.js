import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Input } from 'antd'

class Former extends Component {
  render () {
    const FormItem = Form.Item
    const { getFieldDecorator } = this.props.form
    const { store } = this.props
    return (
      <Form className="form" onSubmit={(e) => {
        if (this.props.onSubmit(e, this.props.form, store.id)) {}
      }}>
        <FormItem label="شماره موبایل" {...formItemLayout}>
          {getFieldDecorator('mobile', {
            rules: [{required: true, message: 'این فیلد الزامی است!'}],
            initialValue: store.mobile
          })(
            <Input />
          )}
        </FormItem>
        <FormItem label="کلمه عبور" {...formItemLayout}>
          {getFieldDecorator('password', {
            rules: [{required: true, message: 'این فیلد الزامی است!'}],
          })(
            <Input type="password" />
          )}
        </FormItem>
        <FormItem label="ایمیل" {...formItemLayout}>
          {getFieldDecorator('email')(
            <Input type="email" />
          )}
        </FormItem>
        <FormItem label="نام فروشگاه (فارسی)" {...formItemLayout}>
          {getFieldDecorator('store_name_fa', {
            rules: [{required: true, message: 'این فیلد الزامی است!'}],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem label="نام فروشگاه (انگلیسی)" {...formItemLayout}>
          {getFieldDecorator('store_name_en')(
            <Input />
          )}
        </FormItem>
        <FormItem label="مالک (فارسی)" {...formItemLayout}>
          {getFieldDecorator('owner_fa')(
            <Input />
          )}
        </FormItem>
        <FormItem label="مالک (انگلیسی)" {...formItemLayout}>
          {getFieldDecorator('owner_en')(
            <Input />
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" className="btn-block">ثبت</Button>
        </FormItem>
      </Form>
    )
  }
}

const formItemLayout = {
  labelCol: {
    xs: 8
  },
  wrapperCol: {
    xs: 16
  }
}

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 16,
      offset: 8
    }
  }
}

Former.propTypes = {
  store: PropTypes.object,
}

Former.defaultProps = {
  store: {
    id: null,
    mobile: '',
    password: '',
    email: '',
    store_name_fa: '',
    store_name_en: '',
    owner_fa: '',
    owner_en: ''
  }
}

export default Form.create()(Former)